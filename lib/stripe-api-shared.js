import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import billingConfig from "./billing-config.server.js";

export const runtime = "nodejs";

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export function getSupabaseAdmin() {
  return createClient(
    (process.env.SUPABASE_URL || "").trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function json(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function getUserFromBearer(req, supabaseAdmin) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

export async function getProfileByIdOrEmail(supabaseAdmin, input) {
  if (input.userId) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id,email")
      .eq("id", input.userId)
      .maybeSingle();

    if (!error && data?.id) return data;
  }

  if (input.email) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id,email")
      .eq("email", input.email)
      .maybeSingle();

    if (!error && data?.id) return data;
  }

  return null;
}

export function getSiteUrl() {
  return (process.env.SITE_URL || process.env.AICALLPORT_BASE_URL || "https://www.aicallport.com").replace(/\/$/, "");
}

export function cleanMetadataValue(value) {
  if (value === undefined || value === null) return "";
  return String(value).slice(0, 500);
}

export function flattenMetadata(metadata) {
  const output = {};
  Object.entries(metadata || {}).forEach(([key, value]) => {
    output[key] = cleanMetadataValue(value);
  });
  return output;
}

export async function searchStripeCustomerByReferralCode(stripe, referralCode) {
  if (!referralCode) return null;

  const result = await stripe.customers.search({
    query: `metadata['referral_code']:'${String(referralCode).replace(/'/g, "\\'")}'`,
    limit: 1
  });

  return result.data?.[0] || null;
}

export async function searchStripeCustomerByAccountId(stripe, accountId) {
  if (!accountId) return null;

  const result = await stripe.customers.search({
    query: `metadata['account_id']:'${String(accountId).replace(/'/g, "\\'")}'`,
    limit: 1
  });

  return result.data?.[0] || null;
}

export async function findSubscriptionRow(supabaseAdmin, lookup) {
  if (lookup.userId) {
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", lookup.userId)
      .maybeSingle();

    if (!error && data) return data;
  }

  if (lookup.email) {
    const profile = await getProfileByIdOrEmail(supabaseAdmin, { email: lookup.email });
    if (profile?.id) {
      const { data, error } = await supabaseAdmin
        .from("subscriptions")
        .select("*")
        .eq("user_id", profile.id)
        .maybeSingle();

      if (!error && data) return data;
    }
  }

  return null;
}

export async function listActiveReferralSubscriptions(stripe, accountId) {
  if (!accountId) return [];

  try {
    const result = await stripe.subscriptions.search({
      query: `metadata['referred_by_account_id']:'${String(accountId).replace(/'/g, "\\'")}' AND status:'active'`,
      limit: 100
    });
    return result.data || [];
  } catch (error) {
    return [];
  }
}

export async function fetchBillingStateFromStripe(stripe, input) {
  let customer = null;
  let subscription = null;

  if (input.sessionId) {
    const session = await stripe.checkout.sessions.retrieve(input.sessionId, {
      expand: ["customer", "subscription"]
    });
    customer = typeof session.customer === "object" ? session.customer : null;
    subscription = typeof session.subscription === "object" ? session.subscription : null;
  }

  if (!subscription && input.subscriptionId) {
    subscription = await stripe.subscriptions.retrieve(input.subscriptionId);
  }

  if (!customer) {
    if (input.customerId) {
      customer = await stripe.customers.retrieve(input.customerId);
    } else if (input.accountId) {
      customer = await searchStripeCustomerByAccountId(stripe, input.accountId);
    } else if (subscription?.customer) {
      customer = typeof subscription.customer === "string"
        ? await stripe.customers.retrieve(subscription.customer)
        : subscription.customer;
    }
  }

  if (!subscription && customer?.id) {
    const subs = await stripe.subscriptions.list({
      customer: customer.id,
      status: "all",
      limit: 10
    });
    subscription = subs.data?.[0] || null;
  }

  if (!customer || !subscription) {
    return null;
  }

  const mergedMetadata = {
    ...(customer.metadata || {}),
    ...(subscription.metadata || {})
  };
  const profile = billingConfig.profileFromMetadata(mergedMetadata);
  const referralSubscriptions = await listActiveReferralSubscriptions(
    stripe,
    mergedMetadata.account_id || ""
  );
  const invoices = await stripe.invoices.list({
    customer: customer.id,
    limit: 6
  });

  const snapshot = billingConfig.buildBillingSnapshot({
    profile,
    phase: mergedMetadata.billing_phase || billingConfig.BILLING_PHASES.betaMonthOne,
    activeReferralCount: referralSubscriptions.length,
    usageMinutes: Number(mergedMetadata.usage_minutes || 0) || 0
  });

  return {
    accountId: mergedMetadata.account_id || "",
    customerId: customer.id,
    subscriptionId: subscription.id,
    companyName: profile.companyName,
    businessEmail: profile.businessEmail || customer.email || "",
    status: subscription.status || "inactive",
    phase: snapshot.phase,
    voiceTier: profile.voiceTier,
    referralCode: mergedMetadata.referral_code || "",
    activeReferralCount: snapshot.activeReferralCount,
    usageMinutes: snapshot.usageMinutes,
    includedMinutes: snapshot.includedMinutes,
    overageMinutes: snapshot.overageMinutes,
    overageCents: snapshot.overageCents,
    referralCreditCents: snapshot.referralCreditCents,
    currentItems: snapshot.currentItems,
    nextItems: snapshot.nextItems,
    currentTotalCents: snapshot.currentTotalCents,
    nextTotalCents: snapshot.nextTotalCents,
    currentSubtotalCents: snapshot.currentSubtotalCents,
    nextSubtotalCents: snapshot.nextSubtotalCents,
    currentPeriodStart: subscription.current_period_start || 0,
    currentPeriodEnd: subscription.current_period_end || 0,
    cancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end),
    invoices: (invoices.data || []).map((invoice) => ({
      id: invoice.id,
      created: invoice.created,
      amountDueCents: invoice.amount_due || 0,
      amountPaidCents: invoice.amount_paid || 0,
      amountRemainingCents: invoice.amount_remaining || 0,
      currency: (invoice.currency || "usd").toUpperCase(),
      status: invoice.status || "open",
      hostedInvoiceUrl: invoice.hosted_invoice_url || "",
      description: invoice.description || "",
      periodStart: invoice.period_start || 0,
      periodEnd: invoice.period_end || 0
    }))
  };
}
