alter table "public"."subscriptions" drop column "cancel_at";

alter table "public"."subscriptions" drop column "canceled_at";

alter table "public"."subscriptions" drop column "ended_at";

alter table "public"."subscriptions" drop column "trial_end";

alter table "public"."subscriptions" drop column "trial_start";

alter table "public"."subscriptions" add column "plan_id" text not null;

alter table "public"."subscriptions" add column "total_requests" bigint not null;

alter table "public"."subscriptions" add column "used_requests" bigint not null default '0'::bigint;

alter table "public"."subscriptions" add constraint "subscriptions_plan_id_fkey" FOREIGN KEY (plan_id) REFERENCES plans(id) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_plan_id_fkey";


