-- AI-ABCX Estimator Director server persistence
-- Idempotent foundation for authenticated multi-user Account, estimate, calendar, and audit storage.

create extension if not exists pgcrypto;

create table if not exists ai_abcx_schema_migrations (
  migration_key text primary key,
  applied_at timestamptz not null default now()
);

create table if not exists account_memberships (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('president','admin','member')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, user_id)
);

insert into account_memberships (company_id, user_id, role)
select id, owner_user_id, 'president' from companies where owner_user_id is not null
on conflict (company_id, user_id) do nothing;

create table if not exists account_dashboard_assignments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  director text not null,
  level text not null default 'A' check (level in ('A','B','C')),
  enabled boolean not null default true,
  revision integer not null default 1,
  assigned_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, user_id, director)
);

create table if not exists estimator_records (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  external_job_id text not null,
  owner_user_id uuid references profiles(id) on delete set null,
  schema_version integer not null default 2,
  status text not null,
  record_data jsonb not null default '{}'::jsonb,
  revision integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, external_job_id)
);

create table if not exists estimator_calendar_entries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  owner_user_id uuid references profiles(id) on delete set null,
  estimator_record_id uuid references estimator_records(id) on delete cascade,
  external_key text not null,
  entry_type text not null check (entry_type in ('availability','appointment','follow_up_deadline','accepted_work')),
  starts_at timestamptz,
  ends_at timestamptz,
  due_date date,
  entry_data jsonb not null default '{}'::jsonb,
  revision integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, external_key)
);

create table if not exists estimator_audit_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  estimator_record_id uuid references estimator_records(id) on delete cascade,
  actor_user_id uuid references profiles(id) on delete set null,
  action text not null,
  previous_status text,
  next_status text,
  record_revision integer not null,
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists account_memberships_user_idx on account_memberships(user_id, active);
create index if not exists account_dashboard_assignments_user_idx on account_dashboard_assignments(company_id, user_id, enabled);
create index if not exists estimator_records_owner_idx on estimator_records(company_id, owner_user_id, status);
create index if not exists estimator_calendar_owner_idx on estimator_calendar_entries(company_id, owner_user_id, starts_at, due_date);
create index if not exists estimator_audit_record_idx on estimator_audit_events(estimator_record_id, created_at);

alter table account_memberships enable row level security;
alter table account_dashboard_assignments enable row level security;
alter table estimator_records enable row level security;
alter table estimator_calendar_entries enable row level security;
alter table estimator_audit_events enable row level security;

-- Server API uses the service role and performs account authorization before every query.
-- Direct authenticated reads remain constrained to the user's active company membership.
drop policy if exists "members read own memberships" on account_memberships;
create policy "members read own memberships" on account_memberships for select to authenticated
using (user_id = auth.uid());

drop policy if exists "members read company dashboard assignments" on account_dashboard_assignments;
create policy "members read company dashboard assignments" on account_dashboard_assignments for select to authenticated
using (exists (select 1 from account_memberships m where m.company_id = account_dashboard_assignments.company_id and m.user_id = auth.uid() and m.active));

drop policy if exists "members read authorized estimator records" on estimator_records;
create policy "members read authorized estimator records" on estimator_records for select to authenticated
using (exists (select 1 from account_memberships m where m.company_id = estimator_records.company_id and m.user_id = auth.uid() and m.active));

drop policy if exists "members read authorized estimator calendar" on estimator_calendar_entries;
create policy "members read authorized estimator calendar" on estimator_calendar_entries for select to authenticated
using (exists (select 1 from account_memberships m where m.company_id = estimator_calendar_entries.company_id and m.user_id = auth.uid() and m.active));

drop policy if exists "members read authorized estimator audit" on estimator_audit_events;
create policy "members read authorized estimator audit" on estimator_audit_events for select to authenticated
using (exists (select 1 from account_memberships m where m.company_id = estimator_audit_events.company_id and m.user_id = auth.uid() and m.active));

insert into ai_abcx_schema_migrations (migration_key)
values ('2026-07-12_estimator_persistence_v1')
on conflict (migration_key) do nothing;
