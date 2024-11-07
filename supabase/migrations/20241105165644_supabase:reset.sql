alter table "public"."subscriptions" alter column "created" drop not null;

alter table "public"."subscriptions" alter column "current_period_end" drop not null;

alter table "public"."subscriptions" alter column "current_period_start" drop not null;


