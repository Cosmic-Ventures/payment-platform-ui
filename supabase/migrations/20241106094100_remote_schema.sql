alter table "public"."plans" add column "requests" bigint not null default '0'::bigint;

alter table "public"."subscriptions" disable row level security;


