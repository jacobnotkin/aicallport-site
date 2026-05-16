import {
  runtime,
  fetchBillingStateFromStripe,
  findSubscriptionRow,
  getStripe,
  getSupabaseAdmin,
  getUserFromBearer,
  json,
  readJsonBody
} from "./_shared.js";

export const config = { api: { bodyParser: true } };
export { runtime };

export default async function handler(req, res) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (req.method === "POST") {
      const body = await readJsonBody(req);
      const action = body.action || "";
      const allowedLeadStatuses = ["new", "reviewing", "qualified", "approved", "rejected", "on_hold", "converted"];
      const allowedCompanyStatuses = ["lead", "approved", "onboarding", "active", "paused", "churned"];

      if (action === "update-beta-status") {
        const id = body.id || "";
        const status = body.status || "";
        const allowedStatuses = ["new", "reviewing", "shortlisted", "approved", "rejected", "contacted"];

        if (!id || !status) {
          return json(res, 400, { error: "Application id and status are required." });
        }

        if (!allowedStatuses.includes(status)) {
          return json(res, 400, { error: "Invalid status value." });
        }

        const { data, error } = await supabaseAdmin
          .from("beta_applications")
          .update({ status })
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update request status." });
        }

        return json(res, 200, { request: data });
      }

      if (action === "update-beta-notes") {
        const id = body.id || "";
        const reviewNotes = typeof body.reviewNotes === "string" ? body.reviewNotes : "";

        if (!id) {
          return json(res, 400, { error: "Application id is required." });
        }

        const { data, error } = await supabaseAdmin
          .from("beta_applications")
          .update({ review_notes: reviewNotes })
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update request notes." });
        }

        return json(res, 200, { request: data });
      }

      if (action === "update-beta-activation-stage") {
        const id = body.id || "";
        const activationStage = body.activationStage || "";
        const allowedStages = ["not_started", "contacted", "onboarding", "activated"];

        if (!id || !activationStage) {
          return json(res, 400, { error: "Application id and activation stage are required." });
        }

        if (!allowedStages.includes(activationStage)) {
          return json(res, 400, { error: "Invalid activation stage value." });
        }

        const { data, error } = await supabaseAdmin
          .from("beta_applications")
          .update({ activation_stage: activationStage })
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update activation stage." });
        }

        return json(res, 200, { request: data });
      }

      if (action === "update-lead-status") {
        const id = body.id || "";
        const status = body.status || "";

        if (!id || !status) {
          return json(res, 400, { error: "Lead id and status are required." });
        }

        if (!allowedLeadStatuses.includes(status)) {
          return json(res, 400, { error: "Invalid lead status value." });
        }

        const { data, error } = await supabaseAdmin
          .from("leads")
          .update({ status })
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update lead status." });
        }

        return json(res, 200, { lead: data });
      }

      if (action === "update-lead-next-action") {
        const id = body.id || "";
        const nextAction = typeof body.nextAction === "string" ? body.nextAction.trim() : "";

        if (!id) {
          return json(res, 400, { error: "Lead id is required." });
        }

        const { data, error } = await supabaseAdmin
          .from("leads")
          .update({ next_action: nextAction || null })
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update next action." });
        }

        return json(res, 200, { lead: data });
      }

      if (action === "update-lead-notes") {
        const id = body.id || "";
        const notes = typeof body.notes === "string" ? body.notes : "";

        if (!id) {
          return json(res, 400, { error: "Lead id is required." });
        }

        const { data, error } = await supabaseAdmin
          .from("leads")
          .update({ notes })
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update lead notes." });
        }

        return json(res, 200, { lead: data });
      }

      if (action === "convert-lead-to-company") {
        const id = body.id || "";

        if (!id) {
          return json(res, 400, { error: "Lead id is required." });
        }

        const { data: lead, error: leadError } = await supabaseAdmin
          .from("leads")
          .select("*")
          .eq("id", id)
          .single();

        if (leadError || !lead) {
          return json(res, 404, { error: leadError?.message || "Lead not found." });
        }

        if (lead.converted_company_id) {
          const { data: existingCompany } = await supabaseAdmin
            .from("companies")
            .select("*")
            .eq("id", lead.converted_company_id)
            .maybeSingle();

          return json(res, 200, {
            lead,
            company: existingCompany || null
          });
        }

        let company = null;

        const { data: existingCompany } = await supabaseAdmin
          .from("companies")
          .select("*")
          .eq("source_id", lead.id)
          .maybeSingle();

        if (existingCompany?.id) {
          company = existingCompany;
        } else {
          const companyPayload = {
            name: lead.company_name,
            country: lead.country || null,
            business_type: lead.business_type || null,
            website: lead.website || null,
            status: "approved",
            owner_user_id: lead.assigned_to || null,
            source_type: lead.lead_source_type || "direct",
            source_id: lead.id,
            notes: lead.notes || null
          };

          const { data: insertedCompany, error: companyError } = await supabaseAdmin
            .from("companies")
            .insert(companyPayload)
            .select("*")
            .single();

          if (companyError || !insertedCompany) {
            return json(res, 500, { error: companyError?.message || "Unable to create company from lead." });
          }

          company = insertedCompany;
        }

        if (lead.contact_name || lead.email || lead.phone) {
          const { data: existingContact } = await supabaseAdmin
            .from("contacts")
            .select("id")
            .eq("company_id", company.id)
            .eq("is_primary", true)
            .maybeSingle();

          if (!existingContact?.id) {
            const { error: contactError } = await supabaseAdmin
              .from("contacts")
              .insert({
                company_id: company.id,
                full_name: lead.contact_name || lead.company_name || "Primary Contact",
                email: lead.email || null,
                phone: lead.phone || null,
                role: "Lead Contact",
                is_primary: true,
                notes: lead.biggest_problem || null
              });

            if (contactError) {
              return json(res, 500, { error: contactError.message || "Company was created but contact creation failed." });
            }
          }
        }

        const { data: updatedLead, error: updateLeadError } = await supabaseAdmin
          .from("leads")
          .update({
            converted_company_id: company.id,
            status: "converted"
          })
          .eq("id", id)
          .select("*")
          .single();

        if (updateLeadError || !updatedLead) {
          return json(res, 500, { error: updateLeadError?.message || "Company was created but lead conversion update failed." });
        }

        return json(res, 200, {
          lead: updatedLead,
          company
        });
      }

      if (action === "update-client-status") {
        const id = body.id || "";
        const status = body.status || "";

        if (!id || !status) {
          return json(res, 400, { error: "Client id and status are required." });
        }

        if (!allowedCompanyStatuses.includes(status)) {
          return json(res, 400, { error: "Invalid client status value." });
        }

        const { data, error } = await supabaseAdmin
          .from("companies")
          .update({ status })
          .eq("id", id)
          .select("*, contacts(*)")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update client status." });
        }

        return json(res, 200, { client: data });
      }

      if (action === "update-client-next-action") {
        const id = body.id || "";
        const nextAction = typeof body.nextAction === "string" ? body.nextAction.trim() : "";

        if (!id) {
          return json(res, 400, { error: "Client id is required." });
        }

        const { data, error } = await supabaseAdmin
          .from("companies")
          .update({ next_action: nextAction || null })
          .eq("id", id)
          .select("*, contacts(*)")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update client next action." });
        }

        return json(res, 200, { client: data });
      }

      if (action === "update-client-notes") {
        const id = body.id || "";
        const notes = typeof body.notes === "string" ? body.notes : "";

        if (!id) {
          return json(res, 400, { error: "Client id is required." });
        }

        const { data, error } = await supabaseAdmin
          .from("companies")
          .update({ notes })
          .eq("id", id)
          .select("*, contacts(*)")
          .single();

        if (error) {
          return json(res, 500, { error: error.message || "Unable to update client notes." });
        }

        return json(res, 200, { client: data });
      }

      return json(res, 400, { error: "Unsupported action." });
    }

    if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });

    const view = req.query.view || "";

    if (view === "beta-applications") {
      const { data, error } = await supabaseAdmin
        .from("beta_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return json(res, 500, { error: error.message || "Unable to load requests." });
      }

      return json(res, 200, { requests: data || [] });
    }

    if (view === "leads") {
      const { data, error } = await supabaseAdmin
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return json(res, 500, { error: error.message || "Unable to load leads." });
      }

      return json(res, 200, { leads: data || [] });
    }

    if (view === "clients") {
      const { data, error } = await supabaseAdmin
        .from("companies")
        .select("*, contacts(*)")
        .order("created_at", { ascending: false });

      if (error) {
        return json(res, 500, { error: error.message || "Unable to load clients." });
      }

      return json(res, 200, { clients: data || [] });
    }

    const stripe = getStripe();
    const authUser = await getUserFromBearer(req, supabaseAdmin);
    const sessionId = req.query.session_id || "";
    const accountId = req.query.account_id || "";
    const email = req.query.email || "";

    const subscriptionRow = await findSubscriptionRow(supabaseAdmin, {
      userId: authUser?.id || "",
      email
    });

    const state = await fetchBillingStateFromStripe(stripe, {
      sessionId,
      customerId: subscriptionRow?.stripe_customer_id || "",
      subscriptionId: subscriptionRow?.stripe_subscription_id || "",
      accountId
    });

    if (!state) {
      return json(res, 404, { error: "No billing account found yet for this business." });
    }

    return json(res, 200, state);
  } catch (error) {
    return json(res, 500, {
      error: error.message || "Unable to load billing state."
    });
  }
}
