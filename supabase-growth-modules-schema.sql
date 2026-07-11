-- AI Call Port growth modules foundation
-- Targets the existing Supabase/Postgres setup used by beta_applications and profiles.
-- Safe to run more than once where possible.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type lead_status as enum (
      'new',
      'reviewing',
      'qualified',
      'approved',
      'rejected',
      'on_hold',
      'converted'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_source_type') then
    create type lead_source_type as enum (
      'direct',
      'referral_partner',
      'content',
      'outreach',
      'ads',
      'organic'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'priority_level') then
    create type priority_level as enum (
      'low',
      'normal',
      'high',
      'urgent'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'company_status') then
    create type company_status as enum (
      'lead',
      'approved',
      'onboarding',
      'active',
      'paused',
      'churned'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'partner_status') then
    create type partner_status as enum (
      'active',
      'review',
      'paused'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'partner_type') then
    create type partner_type as enum (
      'affiliate',
      'agency',
      'publisher',
      'creator',
      'community',
      'strategic'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'attribution_status') then
    create type attribution_status as enum (
      'pending',
      'qualified',
      'rejected',
      'paid'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'approval_status') then
    create type approval_status as enum (
      'pending',
      'approved',
      'held',
      'rejected'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'payout_status') then
    create type payout_status as enum (
      'unpaid',
      'scheduled',
      'paid',
      'void'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'content_type') then
    create type content_type as enum (
      'article',
      'landing_page',
      'blog',
      'linkedin_post',
      'x_post',
      'newsletter',
      'partner_asset',
      'video_script'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'content_status') then
    create type content_status as enum (
      'idea',
      'brief',
      'draft',
      'review',
      'approved',
      'scheduled',
      'published',
      'archived'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'distribution_platform') then
    create type distribution_platform as enum (
      'site',
      'medium',
      'linkedin',
      'x',
      'newsletter',
      'partner_blog'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'distribution_status') then
    create type distribution_status as enum (
      'draft',
      'scheduled',
      'published',
      'failed',
      'archived'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'asset_type') then
    create type asset_type as enum (
      'image',
      'video',
      'document',
      'thumbnail',
      'copy_doc',
      'source'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'outreach_target_type') then
    create type outreach_target_type as enum (
      'blogger',
      'newsletter',
      'podcast',
      'publication',
      'community',
      'influencer',
      'partner'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'outreach_status') then
    create type outreach_status as enum (
      'not_started',
      'queued',
      'contacted',
      'responded',
      'negotiating',
      'accepted',
      'rejected',
      'inactive'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'touch_type') then
    create type touch_type as enum (
      'email',
      'dm',
      'form_submit',
      'call',
      'follow_up'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'touch_direction') then
    create type touch_direction as enum (
      'outbound',
      'inbound'
    );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'touch_status') then
    create type touch_status as enum (
      'queued',
      'sent',
      'replied',
      'no_reply',
      'closed'
    );
  end if;
end $$;

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  country text,
  region text,
  city text,
  business_type text,
  website text,
  status company_status not null default 'lead',
  owner_user_id uuid references profiles(id) on delete set null,
  source_type lead_source_type,
  source_id uuid,
  notes text
);

create index if not exists companies_status_idx on companies(status);
create index if not exists companies_country_idx on companies(country);
create index if not exists companies_owner_user_id_idx on companies(owner_user_id);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company_id uuid not null references companies(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  role text,
  is_primary boolean not null default false,
  notes text
);

create index if not exists contacts_company_id_idx on contacts(company_id);
create index if not exists contacts_email_idx on contacts(email);

create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  entity_type text not null,
  entity_id uuid,
  event_type text not null,
  actor text,
  summary text not null,
  metadata_json jsonb not null default '{}'::jsonb
);

create index if not exists activity_log_entity_idx on activity_log(entity_type, entity_id, created_at desc);
create index if not exists activity_log_event_type_idx on activity_log(event_type);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  beta_application_id uuid unique references beta_applications(id) on delete set null,
  converted_company_id uuid unique references companies(id) on delete set null,
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  country text,
  business_type text,
  website text,
  lead_source_type lead_source_type not null default 'direct',
  lead_source_id uuid,
  fit_score numeric(5,2),
  status lead_status not null default 'new',
  priority priority_level not null default 'normal',
  biggest_problem text,
  monthly_call_volume integer,
  requested_package text,
  assigned_to uuid references profiles(id) on delete set null,
  next_action text,
  next_action_due_at timestamptz,
  notes text
);

create index if not exists leads_status_idx on leads(status);
create index if not exists leads_priority_idx on leads(priority);
create index if not exists leads_source_type_idx on leads(lead_source_type);
create index if not exists leads_lead_source_id_idx on leads(lead_source_id);
create index if not exists leads_assigned_to_idx on leads(assigned_to);
create index if not exists leads_created_at_idx on leads(created_at desc);

create table if not exists referral_partners (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  contact_name text,
  email text,
  phone text,
  country text,
  status partner_status not null default 'review',
  partner_type partner_type not null default 'affiliate',
  default_commission_type text,
  default_commission_value numeric(12,2),
  payout_status payout_status not null default 'unpaid',
  notes text
);

create index if not exists referral_partners_status_idx on referral_partners(status);
create index if not exists referral_partners_country_idx on referral_partners(country);

create table if not exists referral_links (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  partner_id uuid not null references referral_partners(id) on delete cascade,
  code text not null unique,
  url text not null,
  language text,
  campaign_name text,
  status text not null default 'active'
);

create index if not exists referral_links_partner_id_idx on referral_links(partner_id);
create index if not exists referral_links_status_idx on referral_links(status);

create table if not exists referral_attributions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  partner_id uuid not null references referral_partners(id) on delete cascade,
  referral_link_id uuid references referral_links(id) on delete set null,
  lead_id uuid references leads(id) on delete set null,
  company_id uuid references companies(id) on delete set null,
  attribution_status attribution_status not null default 'pending',
  credited_at timestamptz,
  notes text
);

create index if not exists referral_attributions_partner_id_idx on referral_attributions(partner_id);
create index if not exists referral_attributions_lead_id_idx on referral_attributions(lead_id);
create index if not exists referral_attributions_company_id_idx on referral_attributions(company_id);
create index if not exists referral_attributions_status_idx on referral_attributions(attribution_status);

create table if not exists partner_payouts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  partner_id uuid not null references referral_partners(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  qualified_conversions integer not null default 0,
  amount_due numeric(12,2) not null default 0,
  approval_status approval_status not null default 'pending',
  paid_status payout_status not null default 'unpaid',
  paid_at timestamptz,
  notes text
);

create index if not exists partner_payouts_partner_id_idx on partner_payouts(partner_id);
create index if not exists partner_payouts_approval_status_idx on partner_payouts(approval_status);
create index if not exists partner_payouts_paid_status_idx on partner_payouts(paid_status);

create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  content_type content_type not null,
  language text,
  market text,
  status content_status not null default 'idea',
  theme text,
  campaign_id uuid,
  source_content_id uuid references content_items(id) on delete set null,
  target_persona text,
  primary_cta_type lead_source_type,
  primary_cta_id uuid,
  owner_user_id uuid references profiles(id) on delete set null,
  publish_due_at timestamptz,
  published_at timestamptz,
  notes text
);

create index if not exists content_items_status_idx on content_items(status);
create index if not exists content_items_content_type_idx on content_items(content_type);
create index if not exists content_items_owner_user_id_idx on content_items(owner_user_id);
create index if not exists content_items_campaign_id_idx on content_items(campaign_id);

create table if not exists content_distributions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  platform distribution_platform not null,
  format text,
  status distribution_status not null default 'draft',
  scheduled_for timestamptz,
  published_at timestamptz,
  tracking_link_id uuid references referral_links(id) on delete set null,
  result_notes text
);

create index if not exists content_distributions_content_item_id_idx on content_distributions(content_item_id);
create index if not exists content_distributions_platform_idx on content_distributions(platform);
create index if not exists content_distributions_status_idx on content_distributions(status);

create table if not exists content_assets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  asset_type asset_type not null,
  file_url text not null,
  version_label text,
  status text not null default 'active'
);

create index if not exists content_assets_content_item_id_idx on content_assets(content_item_id);
create index if not exists content_assets_asset_type_idx on content_assets(asset_type);

create table if not exists outreach_campaigns (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  goal text,
  status text not null default 'active',
  owner_user_id uuid references profiles(id) on delete set null,
  notes text
);

create index if not exists outreach_campaigns_owner_user_id_idx on outreach_campaigns(owner_user_id);
create index if not exists outreach_campaigns_status_idx on outreach_campaigns(status);

create table if not exists outreach_targets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  organization text,
  target_type outreach_target_type not null,
  country text,
  email text,
  website text,
  audience_type text,
  fit_score numeric(5,2),
  status outreach_status not null default 'not_started',
  notes text
);

create index if not exists outreach_targets_status_idx on outreach_targets(status);
create index if not exists outreach_targets_target_type_idx on outreach_targets(target_type);
create index if not exists outreach_targets_country_idx on outreach_targets(country);

create table if not exists outreach_touches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  target_id uuid not null references outreach_targets(id) on delete cascade,
  campaign_id uuid references outreach_campaigns(id) on delete set null,
  touch_type touch_type not null,
  direction touch_direction not null default 'outbound',
  status touch_status not null default 'queued',
  sent_at timestamptz,
  reply_due_at timestamptz,
  response_summary text,
  next_step text,
  owner_user_id uuid references profiles(id) on delete set null
);

create index if not exists outreach_touches_target_id_idx on outreach_touches(target_id);
create index if not exists outreach_touches_campaign_id_idx on outreach_touches(campaign_id);
create index if not exists outreach_touches_status_idx on outreach_touches(status);
create index if not exists outreach_touches_reply_due_at_idx on outreach_touches(reply_due_at);

comment on table leads is 'Growth and beta intake layer. Approved leads should convert into companies.';
comment on column leads.beta_application_id is 'Links the new growth schema to the existing beta_applications table.';
comment on table referral_attributions is 'Tracks which partner/link actually deserves credit for a lead or company conversion.';
comment on table content_items is 'Master record for articles, posts, landing pages, partner assets, and video scripts.';
comment on table outreach_touches is 'Every outreach attempt or reply tied to a target and optional campaign.';
