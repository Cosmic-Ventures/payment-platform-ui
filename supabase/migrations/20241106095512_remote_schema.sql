alter table "public"."plans" drop column "requests";

alter table "public"."plans" alter column "metadata" set not null;

alter table "public"."plans" disable row level security;


