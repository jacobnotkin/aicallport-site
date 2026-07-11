(function (globalScope) {
  const STORAGE_KEY = "aicallport-billing-account-id";
  const config = globalScope.AICallPortBillingConfig;

  if (!config) {
    return;
  }

  function readSearchParams() {
    return new URLSearchParams(globalScope.location.search);
  }

  function getStoredAccountId() {
    try {
      return globalScope.localStorage.getItem(STORAGE_KEY) || "";
    } catch (error) {
      return "";
    }
  }

  function setStoredAccountId(accountId) {
    if (!accountId) return;
    try {
      globalScope.localStorage.setItem(STORAGE_KEY, accountId);
    } catch (error) {
      // Ignore storage failures in private mode.
    }
  }

  function searchParamsToObject(searchParams) {
    const output = {};
    searchParams.forEach((value, key) => {
      output[key] = value;
    });
    return output;
  }

  async function fetchJson(url, options) {
    const response = await fetch(url, options);
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Request failed.");
    }
    return payload;
  }

  async function createCheckoutFromCurrentSetup() {
    const params = readSearchParams();
    const setup = searchParamsToObject(params);
    const result = await fetchJson("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        origin: globalScope.location.origin,
        setup
      })
    });

    if (result.accountId) {
      setStoredAccountId(result.accountId);
    }

    if (!result.checkoutUrl) {
      throw new Error("Stripe checkout URL was not returned.");
    }

    globalScope.location.href = result.checkoutUrl;
  }

  function findAccountLookup() {
    const params = readSearchParams();
    const sessionId = params.get("session_id") || "";
    const accountId = params.get("account_id") || getStoredAccountId();
    const email = params.get("businessEmail") || "";

    if (accountId) {
      setStoredAccountId(accountId);
    }

    return { sessionId, accountId, email };
  }

  async function loadBillingState() {
    const lookup = findAccountLookup();
    const search = new URLSearchParams();
    if (lookup.sessionId) search.set("session_id", lookup.sessionId);
    if (lookup.accountId) search.set("account_id", lookup.accountId);
    if (lookup.email) search.set("email", lookup.email);

    if (![...search.keys()].length) {
      throw new Error("No billing account has been activated yet.");
    }

    const state = await fetchJson(`/api/stripe/billing-state?${search.toString()}`);
    if (state.accountId) {
      setStoredAccountId(state.accountId);
    }
    return state;
  }

  function setText(root, selector, text) {
    const element = root.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  }

  function setHtml(root, selector, html) {
    const element = root.querySelector(selector);
    if (element) {
      element.innerHTML = html;
    }
  }

  function formatInvoiceDate(unixSeconds) {
    return new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  function renderInvoiceRows(invoices) {
    if (!invoices.length) {
      return `
        <div class="row">
          <div class="row-main"><div>No invoices yet</div><div>—</div><div>Pending first billing cycle</div><div><span class="tag orange">New</span></div></div>
          <div class="row-sub">Stripe has the live subscription record, but no finalized invoice exists yet.</div>
        </div>
      `;
    }

    return invoices.map((invoice) => `
      <div class="row">
        <div class="row-main">
          <div>${formatInvoiceDate(invoice.created)} Invoice</div>
          <div>${config.formatCurrency(invoice.amountPaidCents || invoice.amountDueCents || 0)}</div>
          <div>${invoice.status === "paid" ? `Paid ${formatInvoiceDate(invoice.created)}` : invoice.status}</div>
          <div><span class="tag ${invoice.status === "paid" ? "green" : "orange"}">${invoice.status}</span></div>
        </div>
        <div class="row-sub">${invoice.description || "Live invoice pulled from Stripe subscription history."}</div>
      </div>
    `).join("");
  }

  function applyBillingPageState(state) {
    const summaryCards = document.querySelectorAll(".summary-grid .card");
    if (summaryCards.length >= 5) {
      setText(summaryCards[0], ".value", config.formatCurrency(state.currentItems[0].amountCents));
      setText(summaryCards[0], ".meta", `${state.voiceTier} voice tier base subscription`);
      setText(summaryCards[1], ".value", config.formatCurrency(state.nextSubtotalCents - state.currentItems[0].amountCents));
      setText(summaryCards[1], ".meta", `${state.nextItems.length - 1} future carry-over item${state.nextItems.length - 1 === 1 ? "" : "s"}`);
      setText(summaryCards[2], ".value", String(state.usageMinutes));
      setText(summaryCards[2], ".meta", `Of ${state.includedMinutes} included ${state.voiceTier === "Luxury" ? "luxury" : "standard"}-voice minutes`);
      setText(summaryCards[3], ".value", config.formatCurrency(state.overageCents));
      setText(summaryCards[3], ".meta", state.overageMinutes > 0 ? `${state.overageMinutes} overage minutes this cycle` : "Current usage remains inside plan");
      setText(summaryCards[4], ".value", config.formatCurrency(state.nextTotalCents));
      setText(summaryCards[4], ".meta", "Projected next recurring total after referral credits");
    }

    const topbarChips = document.querySelectorAll(".topbar-right .chip");
    if (topbarChips.length >= 3) {
      topbarChips[0].textContent = `Stripe ${state.status}`;
      topbarChips[1].textContent = state.phase === "beta_month_one" ? "Beta Month 1" : "Recurring Billing";
      topbarChips[2].textContent = `Next Bill ${config.formatMonthDay(state.currentPeriodEnd)}`;
    }

    const priceBox = document.querySelector(".price-box");
    if (priceBox) {
      setText(priceBox, ".big", config.formatCurrency(state.currentTotalCents));
      setText(priceBox, "p", state.phase === "beta_month_one"
        ? "Only the base subscription is billed during Beta month one. Selected upgrades are carried into the next invoice projection below."
        : "Current billing reflects the live recurring subscription plus any usage overage and referral credits.");
    }

    const currentSubscriptionLines = document.querySelectorAll(".split .card:first-child .list .line");
    if (currentSubscriptionLines.length) {
      const currentHtml = state.currentItems.map((item) => `
        <div class="line">
          <div class="line-top"><strong>${item.name}</strong><span>${config.formatCurrency(item.amountCents)}/mo</span></div>
          <p>${item.description || "Live recurring billing item."}</p>
        </div>
      `).join("");
      currentSubscriptionLines[0].parentElement.innerHTML = currentHtml;
    }

    const usageItems = document.querySelectorAll(".split .card:nth-child(2) .mini-list .mini-item");
    if (usageItems.length >= 3) {
      setText(usageItems[0], "p", `${state.usageMinutes} of ${state.includedMinutes} included ${state.voiceTier === "Luxury" ? "luxury" : "standard"}-voice minutes used this cycle.`);
      const fill = usageItems[0].querySelector(".fill");
      if (fill) {
        fill.style.width = `${Math.min((state.usageMinutes / state.includedMinutes) * 100, 100)}%`;
      }
      setText(usageItems[1], "strong", `${state.voiceTier} package`);
      setText(usageItems[1], "p", `${state.voiceTier === "Luxury" ? "Luxury" : "Standard"} package is active. Overage rate is ${state.voiceTier === "Luxury" ? "$0.45/min" : "$0.30/min"} after included usage.`);
      setText(usageItems[2], "p", `Stripe subscription is ${state.status}. Referral code ${state.referralCode || "not assigned"} is attached to this live billing account.`);
      setHtml(usageItems[2], ".tag-row", `<span class="tag ${state.status === "active" ? "green" : "orange"}">${state.status}</span>`);
    }

    const invoiceTable = document.querySelector(".table");
    if (invoiceTable) {
      invoiceTable.innerHTML = renderInvoiceRows(state.invoices);
    }
  }

  function buildMetricRows(items, totalLabel, totalAmount) {
    const html = items.map((item) => `
      <div class="metric-row"><span>${item.name}</span><strong>${config.formatCurrency(item.amountCents)}/month</strong></div>
    `);
    html.push(`<div class="metric-row"><span>${totalLabel}</span><strong>${config.formatCurrency(totalAmount)}/month</strong></div>`);
    return html.join("");
  }

  function buildItemList(items, phase, referralCredits, totalAmount) {
    const rows = items.map((item) => `
      <div class="item">
        <div class="item-top"><strong>${item.name}</strong><span class="stamp">${config.formatCurrency(item.amountCents)}/month</span></div>
        <p>${item.description || "Live billing item from Stripe-backed account state."}</p>
      </div>
    `);

    rows.push(`
      <div class="item">
        <div class="item-top"><strong>Referral credits</strong><span class="stamp">-${config.formatCurrency(referralCredits).replace("$", "")}/month</span></div>
        <p>Live referral discounts reduce the invoice by $10 per active referred account.</p>
      </div>
    `);

    rows.push(`
      <div class="item">
        <div class="item-top"><strong>Total ${phase === "beta_month_one" ? "billed now" : "recurring total"}</strong><span class="stamp">${config.formatCurrency(totalAmount)}</span></div>
        <p>${phase === "beta_month_one" ? "Beta month one bills only the base subscription while carry-over choices stay saved for next month." : "Recurring billing is pulled from live subscription and carry-over state."}</p>
      </div>
    `);

    return rows.join("");
  }

  function hydrateDashboardBilling(root, submenu, state) {
    if (submenu === "Plan") {
      const cards = root.querySelectorAll(".panel-grid.cols-2 > .card");
      if (cards.length >= 4) {
        const metricLists = root.querySelectorAll(".metric-list");
        if (metricLists.length >= 2) {
          metricLists[0].innerHTML = buildMetricRows(state.currentItems, "Total current charge", state.currentTotalCents);
          metricLists[1].innerHTML = buildMetricRows(state.nextItems, "Projected next total", state.nextTotalCents);
        }

        const futureControls = cards[2].querySelector(".list");
        if (futureControls) {
          futureControls.innerHTML = state.nextItems.slice(1).map((item) => `
            <div class="item">
              <div class="item-top"><strong>${item.name}</strong><span class="stamp">${config.formatCurrency(item.amountCents)}/month</span></div>
              <p>${item.description || "Saved carry-over setting."}</p>
              <div class="tag-row"><span class="tag green">Keep After Month 1</span><span class="tag blue">Live Rule</span></div>
            </div>
          `).join("") || `<div class="item"><strong>No carry-over upgrades saved</strong><p>This account is currently set to continue with the base plan only after the beta period.</p></div>`;
        }

        const referralCard = cards[3].querySelector(".list");
        if (referralCard) {
          referralCard.innerHTML = `
            <div class="item">
              <div class="item-top"><strong>Personal referral link</strong><span class="stamp">Active</span></div>
              <p>https://aicallport.com/start?ref=${state.referralCode || "pending"}</p>
            </div>
            <div class="item">
              <div class="item-top"><strong>Active referred accounts</strong><span class="stamp">${state.activeReferralCount}</span></div>
              <p>Live Stripe-backed referral count used to calculate monthly credits.</p>
            </div>
            <div class="item">
              <div class="item-top"><strong>Total referral credit</strong><span class="stamp">-${config.formatCurrency(state.referralCreditCents)}/month</span></div>
              <p>Credits are applied automatically before invoice totals are shown in the dashboard.</p>
            </div>
          `;
        }
      }
    }

    if (submenu === "Usage") {
      const metricList = root.querySelector(".metric-list");
      if (metricList) {
        metricList.innerHTML = `
          <div class="metric-row"><span>Minutes used</span><strong>${state.usageMinutes} / ${state.includedMinutes}</strong></div>
          <div class="metric-row"><span>Voice usage tier</span><strong>${state.voiceTier}</strong></div>
          <div class="metric-row"><span>Overage this cycle</span><strong>${config.formatCurrency(state.overageCents)}</strong></div>
        `;
      }
    }

    if (submenu === "Invoices") {
      const cards = root.querySelectorAll(".panel-grid.cols-2 > .card");
      if (cards.length >= 2) {
        const currentList = cards[0].querySelector(".list");
        const nextList = cards[1].querySelector(".list");
        if (currentList) {
          currentList.innerHTML = buildItemList(state.currentItems, state.phase, state.referralCreditCents, state.currentTotalCents);
        }
        if (nextList) {
          nextList.innerHTML = buildItemList(state.nextItems, "standard", state.referralCreditCents, state.nextTotalCents).replace(
            "Total recurring total",
            "Projected next invoice"
          );
        }
      }
    }

    if (submenu === "Payment Settings") {
      const metricList = root.querySelector(".metric-list");
      if (metricList) {
        metricList.innerHTML = `
          <div class="metric-row"><span>Billing email</span><strong>${state.businessEmail || "Not set"}</strong></div>
          <div class="metric-row"><span>Subscription status</span><strong>${state.status}</strong></div>
          <div class="metric-row"><span>Current phase</span><strong>${state.phase === "beta_month_one" ? "Beta Month 1" : "Recurring"}</strong></div>
          <div class="metric-row"><span>Next invoice date</span><strong>${config.formatMonthDay(state.currentPeriodEnd)}</strong></div>
        `;
      }
    }
  }

  async function loadAndApplyDashboardBilling(root, submenu) {
    try {
      const state = await loadBillingState();
      hydrateDashboardBilling(root, submenu, state);
    } catch (error) {
      if (root) {
        const firstCard = root.querySelector(".card");
        if (firstCard) {
          const note = document.createElement("p");
          note.style.marginTop = "12px";
          note.textContent = `Live billing data is not available yet: ${error.message}`;
          firstCard.appendChild(note);
        }
      }
    }
  }

  async function initBillingPage() {
    try {
      const state = await loadBillingState();
      applyBillingPageState(state);
    } catch (error) {
      const topbar = document.querySelector(".topbar-left p");
      if (topbar) {
        topbar.textContent = `Live billing data is not available yet: ${error.message}`;
      }
    }
  }

  globalScope.AICallPortBilling = {
    createCheckoutFromCurrentSetup,
    hydrateDashboardBilling,
    initBillingPage,
    loadAndApplyDashboardBilling,
    loadBillingState
  };
})(typeof window !== "undefined" ? window : globalThis);
