import billingConfig from "../../lib/billing-config.server.js";
import {
  runtime,
  flattenMetadata,
  getProfileByIdOrEmail,
  getSiteUrl,
  getStripe,
  getSupabaseAdmin,
  getUserFromBearer,
  json,
  readJsonBody,
  searchStripeCustomerByReferralCode
} from "./_shared.js";

export const config = { api: { bodyParser: true } };
export { runtime };

function buildUpgradeCodeMap(profile) {
  return {
    scheduling: profile.upgrades.scheduling,
    advanced_management: profile.upgrades.advancedManagement,
    outbound_follow_up: profile.upgrades.outbound,
    additional_language: profile.upgrades.additionalLanguage,
    crm_sync: profile.upgrades.crmSync,
    additional_seats: profile.upgrades.extraSeats
  };
}

function getStageAPathPricing(path) {
  if (path === "prelaunch") {
    return {
      key: "prelaunch",
      name: "AI Call Port Stage A Prelaunch Access",
      description: "Stage A prelaunch reservation path.",
      amountCents: 34900
    };
  }

  return {
    key: "regular",
    name: "AI Call Port Stage A Regular Path",
    description: "Stage A regular reservation path.",
    amountCents: 49900
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const stripe = getStripe();
    const supabaseAdmin = getSupabaseAdmin();
    const body = await readJsonBody(req);
    const setup = body.setup || req.body || {};
    const profile = billingConfig.parseSetupParams(setup);
    const selectedPath = setup.path === "prelaunch" ? "prelaunch" : "regular";
    const stagePricing = getStageAPathPricing(selectedPath);
    const authUser = await getUserFromBearer(req, supabaseAdmin);
    const profileRow = await getProfileByIdOrEmail(supabaseAdmin, {
      userId: authUser?.id || "",
      email: profile.businessEmail
    });

    if (!profile.businessEmail) {
      return json(res, 400, { error: "Business email is required for Stripe reservation." });
    }

    const accountId = body.accountId || billingConfig.generateAccountId();
    const referralCode = billingConfig.generateReferralCode(profile.companyName);
    const referringCustomer = profile.referralCode
      ? await searchStripeCustomerByReferralCode(stripe, profile.referralCode)
      : null;

    const metadata = flattenMetadata({
      ...billingConfig.metadataFromProfile({
        accountId,
        profile,
        phase: billingConfig.BILLING_PHASES.betaMonthOne,
        generatedReferralCode: referralCode,
        referredByCode: profile.referralCode || "",
        activeReferralCount: 0,
        usageMinutes: 0
      }),
      selected_path: selectedPath,
      intended_first_charge_date: "2026-06-01",
      user_id: authUser?.id || profileRow?.id || "",
      referred_by_account_id: referringCustomer?.metadata?.account_id || "",
      upgrade_codes: JSON.stringify(buildUpgradeCodeMap(profile)),
      carry_codes: JSON.stringify(buildUpgradeCodeMap({ upgrades: profile.carryOver }))
    });

    const siteUrl = getSiteUrl();
    const cancelParams = new URLSearchParams(setup);
    cancelParams.set("checkoutCanceled", "1");
    cancelParams.set("account_id", accountId);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: stagePricing.name,
              description: stagePricing.description
            },
            recurring: { interval: "month" },
            unit_amount: stagePricing.amountCents
          },
          quantity: 1
        }
      ],
      customer_email: profile.businessEmail,
      client_reference_id: authUser?.id || profileRow?.id || accountId,
      metadata,
      subscription_data: {
        metadata
      },
      success_url: `${siteUrl}/billing.html?session_id={CHECKOUT_SESSION_ID}&account_id=${encodeURIComponent(accountId)}`,
      cancel_url: `${siteUrl}/step3.html?${cancelParams.toString()}`,
      allow_promotion_codes: true
    });

    return json(res, 200, {
      accountId,
      checkoutUrl: session.url
    });
  } catch (error) {
    return json(res, 500, {
      error: error.message || "Unable to create Stripe checkout session."
    });
  }
}
