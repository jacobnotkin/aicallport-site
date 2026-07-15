const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");

async function loadShared() {
  const source = fs.readFileSync(path.join(root, "lib/estimator-api-shared.js"), "utf8")
    .replace('import { createClient } from "@supabase/supabase-js";\n', "const createClient = () => ({});\n");
  return import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
}

test("optimistic revisions accept the current revision and reject stale writes", async () => {
  const { nextRevision } = await loadShared();
  assert.equal(nextRevision(0, 0), 1);
  assert.equal(nextRevision(7, 7), 8);
  assert.throws(() => nextRevision(7, 6), (error) => error.code === "REVISION_CONFLICT" && error.currentRevision === 7);
});

test("authenticated user lookup rejects missing and invalid bearer sessions", async () => {
  const { getAuthenticatedUser } = await loadShared();
  const supabase = { auth: { getUser: async (token) => token === "valid" ? { data: { user: { id: "user-1" } } } : { error: new Error("invalid") } } };
  assert.equal(await getAuthenticatedUser({ headers: {} }, supabase), null);
  assert.equal(await getAuthenticatedUser({ headers: { authorization: "Bearer invalid" } }, supabase), null);
  assert.deepEqual(await getAuthenticatedUser({ headers: { authorization: "Bearer valid" } }, supabase), { id: "user-1" });
});

test("browser auth client reads and creates Supabase sessions", async () => {
  const storage = new Map();
  const session = { access_token: "server-session-token", user: { id: "user-1" } };
  const auth = {
    getSession: async () => ({ data: { session }, error: null }),
    signInWithPassword: async ({ email, password }) => ({ data: email && password ? { session } : {}, error: null }),
    signOut: async () => ({ error: null })
  };
  const context = {
    window: { supabase: { createClient: () => ({ auth }) } },
    localStorage: { getItem: (key) => storage.get(key) || null, removeItem: (key) => storage.delete(key) },
    fetch: async () => ({ ok: true, json: async () => ({ supabaseUrl: "https://example.supabase.co", supabaseAnonKey: "anon" }) })
  };
  context.window.window = context.window;
  context.window.localStorage = context.localStorage;
  context.window.fetch = context.fetch;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "ai-abcx-auth-client.js"), "utf8"), context);
  assert.equal(await context.window.AIABCXAuthClient.getAccessToken(), "server-session-token");
  assert.deepEqual(JSON.parse(JSON.stringify(await context.window.AIABCXAuthClient.signInWithPassword("owner@example.com", "secret"))), session);
});

test("browser auth client preserves local mode when server configuration is unavailable", async () => {
  const context = {
    window: {},
    localStorage: { getItem: () => null },
    fetch: async () => ({ ok: false, json: async () => ({ error: "not deployed" }) })
  };
  context.window.window = context.window;
  context.window.localStorage = context.localStorage;
  context.window.fetch = context.fetch;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "ai-abcx-auth-client.js"), "utf8"), context);
  assert.equal(await context.window.AIABCXAuthClient.getAccessToken(), "");
});

function loadBrowserRepositories(fetchImpl, token = "token") {
  const storage = new Map([["ai-abcx-access-token", token]]);
  const context = { window: {}, localStorage: { getItem: (key) => storage.get(key) || null }, fetch: fetchImpl };
  context.window.window = context.window;
  context.window.localStorage = context.localStorage;
  context.window.fetch = fetchImpl;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "ai-abcx-auth-client.js"), "utf8"), context);
  vm.runInContext(fs.readFileSync(path.join(root, "ai-abcx-server-repositories.js"), "utf8"), context);
  return context.window.AIABCXServerRepositories;
}

test("first authenticated bootstrap imports local estimator and calendar state once", async () => {
  const calls = [];
  const fetchImpl = async (url, options = {}) => {
    calls.push([url, options.method || "GET"]);
    const response = url.endsWith("/account") ? { assignments: [] }
      : url.endsWith("/records") && !options.method ? { records: [] }
      : url.endsWith("/calendar") && !options.method ? { entries: [] }
      : url.endsWith("/records") ? { records: [{ id: "job-1", serverRevision: 1 }] }
      : { entries: [{ externalKey: "availability:2026-07-12", entryType: "availability", dueDate: "2026-07-12", day: { status: "availableAllDay" }, serverRevision: 1 }] };
    return { ok: true, status: 200, json: async () => response };
  };
  const repository = loadBrowserRepositories(fetchImpl);
  const result = await repository.bootstrap([{ id: "job-1" }], { "2026-07-12": { status: "availableAllDay" } });
  assert.equal(result.mode, "server");
  assert.equal(result.records[0].serverRevision, 1);
  assert.equal(result.calendarState["2026-07-12"].status, "availableAllDay");
  assert.deepEqual(calls, [["/api/estimator/account", "GET"], ["/api/estimator/records", "GET"], ["/api/estimator/calendar", "GET"], ["/api/estimator/records", "POST"], ["/api/estimator/calendar", "POST"]]);
});

test("conflict responses retain server revision metadata", async () => {
  const repository = loadBrowserRepositories(async () => ({ ok: false, status: 409, json: async () => ({ error: "stale", code: "REVISION_CONFLICT", currentRevision: 4 }) }));
  await assert.rejects(() => repository.saveRecord({ id: "job-1", serverRevision: 3 }), (error) => error.status === 409 && error.currentRevision === 4);
});
