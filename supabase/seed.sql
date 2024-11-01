SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '89e42453-0dbf-49b5-bdde-84ffad37a676', '{"action":"user_confirmation_requested","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-10-29 09:10:32.3467+00', ''),
	('00000000-0000-0000-0000-000000000000', '6954e71a-4f85-4b8c-aa2b-c53fe78867b8', '{"action":"user_signedup","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"team"}', '2024-10-29 09:10:53.279645+00', ''),
	('00000000-0000-0000-0000-000000000000', '36cd5961-bf02-404b-ac65-36a4b7703b8f', '{"action":"login","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2024-10-29 09:10:53.7191+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f46ba5e-90b1-48a2-8b31-ce7198bd2989', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:42:57.46289+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd176bfd5-9f36-43d5-9db7-9e73c4edc061', '{"action":"token_revoked","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:42:57.46379+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d037a6f-1268-4ceb-b668-b9d24c27ad0d', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:42:58.539545+00', ''),
	('00000000-0000-0000-0000-000000000000', '9add8308-fda3-4c7f-b327-11a2c36194f7', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:42:58.548753+00', ''),
	('00000000-0000-0000-0000-000000000000', '21708bc5-f96a-4d26-b55b-b85f5b368643', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:42:59.202456+00', ''),
	('00000000-0000-0000-0000-000000000000', '32240aa0-aa1a-400c-9359-92898b5c35d5', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:42:59.391108+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7c36b8d-4848-4928-8e1a-2e0eb7fc7dd1', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:03.212208+00', ''),
	('00000000-0000-0000-0000-000000000000', '1caad8f9-ebca-40b5-9bec-e456bc4d86c5', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:03.697387+00', ''),
	('00000000-0000-0000-0000-000000000000', '5311198a-3643-4bc7-922a-b4f4fcc00616', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:03.751871+00', ''),
	('00000000-0000-0000-0000-000000000000', '34fa5577-f9bb-43b6-b471-dab60359ac8a', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:03.768407+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee9273d4-2d8f-49e5-bb21-ebce878c2038', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:03.795626+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc04b079-52f4-4f0b-8bd7-e39cefa04acf', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:03.805356+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c721e3b-0e7d-42be-8f17-df071213ab22', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:03.853104+00', ''),
	('00000000-0000-0000-0000-000000000000', '37519c62-0970-45f6-a569-c7d912bfa577', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:03.914412+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ea55c07-dff7-4cec-a31d-db78458a8138', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:03.930123+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b736dc0-2691-46a7-a1e0-bf0917c064d9', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.053905+00', ''),
	('00000000-0000-0000-0000-000000000000', '63f3b6b5-7118-4ccb-af17-ba76ae019f19', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.07184+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b95e9b49-d16d-4e28-95a8-a79e34ac75c5', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.085766+00', ''),
	('00000000-0000-0000-0000-000000000000', '71b22f8b-9de2-4099-91ed-2397d5328be9', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.098593+00', ''),
	('00000000-0000-0000-0000-000000000000', '85621d48-a736-4001-b96c-08737395a379', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.11982+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f5583d09-9b83-4d32-ac6d-b6fddc52fcf0', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.133566+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c41400e3-ded4-448c-99ef-cc68aa71525c', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.164837+00', ''),
	('00000000-0000-0000-0000-000000000000', '002e4582-69b2-4dba-8fc5-3d67ffd16edf', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.211154+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af6b99aa-ee1e-4abe-815a-e5411c5a9ea6', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.251144+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a63d480b-4188-4e5f-9526-473b5cef1f27', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.265152+00', ''),
	('00000000-0000-0000-0000-000000000000', '589b3ef3-d11a-47e0-ab5b-7ac7d808fa87', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.292831+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e157a0c4-0389-449d-9950-8a3d26e2bb0e', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.308592+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee998f18-3d5f-4ce2-81ad-ecde4d5dae7e', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.330699+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb599c04-1dff-4b75-8cca-39f2f05dcd34', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.338988+00', ''),
	('00000000-0000-0000-0000-000000000000', '192ad86c-2373-47ea-bb8f-2336c9011f80', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.349745+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bbdf3cd9-ac1f-4357-9e23-c2f64b650123', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.369583+00', ''),
	('00000000-0000-0000-0000-000000000000', '092148f9-43b0-4dee-8a9e-5595621d0aa1', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.378671+00', ''),
	('00000000-0000-0000-0000-000000000000', '09dc8687-1932-4e01-a654-493b74ebe746', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.408314+00', ''),
	('00000000-0000-0000-0000-000000000000', '33a6d69b-ea0d-461c-9899-9a9fc7bf18d3', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:04.442728+00', ''),
	('00000000-0000-0000-0000-000000000000', '05e39488-ac94-4948-ab30-f16e2d614c1d', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:36.827153+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fad87ea-1867-42d2-b9e9-bb633fb1689c', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:37.267082+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1489181-dbab-41dc-97d3-41ef9145c0b9', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:37.288846+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c79a554-094e-4d21-b74d-23febf910ee9', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:37.663595+00', ''),
	('00000000-0000-0000-0000-000000000000', '5daa2dda-c132-4777-afbf-0fd24fc4c45b', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:37.855716+00', ''),
	('00000000-0000-0000-0000-000000000000', '4dcf35fb-a530-4bd2-bb58-14314a5a3fcd', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:51.786662+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa3df997-29bb-4279-aabb-e8cb8b7a68a3', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:52.262388+00', ''),
	('00000000-0000-0000-0000-000000000000', '9a5d4cee-54e9-4a25-8309-6e9d8a8ea33b', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:52.288369+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c75c3bec-7e82-40bd-b309-43a88fe4e5ef', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:52.657234+00', ''),
	('00000000-0000-0000-0000-000000000000', '4041ce6c-7597-40e9-9ce2-a1a635a92ef8', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:52.847096+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f31495fa-b032-4b12-b726-2cb2b0d5c334', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:56.668684+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc49084c-e81d-4327-9c24-b23e857891f2', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.151017+00', ''),
	('00000000-0000-0000-0000-000000000000', '76127204-0fb4-40f6-90c9-7f8431d8c5d0', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.228288+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e6bae85-886c-488e-b794-0535d2f8b4a2', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.23583+00', ''),
	('00000000-0000-0000-0000-000000000000', '176dd7ac-a2b6-4cda-99a7-fefd39dc5e2d', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.247044+00', ''),
	('00000000-0000-0000-0000-000000000000', '9cb1e71a-959b-423d-9cb3-5cb3c7372fda', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.261571+00', ''),
	('00000000-0000-0000-0000-000000000000', '67c71a19-3a45-4c5b-be82-17bd6b32c383', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.275475+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b61f7cf-c708-45e6-b6f2-72f45f8acf80', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.315818+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b4b22f4b-60ae-43f5-a0a2-d48a7cd72220', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.463425+00', ''),
	('00000000-0000-0000-0000-000000000000', '885e6726-ce5d-4e20-b1e5-ba5eca750a9e', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.254044+00', ''),
	('00000000-0000-0000-0000-000000000000', '7658a432-9e62-4e6e-83b4-0377e640d1bb', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.268239+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c34c1f0-d23d-4ebe-a5a9-6b55abdffc2f', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.284013+00', ''),
	('00000000-0000-0000-0000-000000000000', '311174c6-0442-4a1e-bab5-0290fc6cf18b', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.32244+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fef2abe-8cf8-42c0-9a23-ed3c134f99a1', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.336444+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af51874c-0088-4d40-b97e-6ed85d325d70', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.347956+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c498296-d203-42ba-9e87-908f088333b9', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.35801+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4e6f6ac-ea72-45e2-a8e2-ef235b5b45d1', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:43:57.372788+00', ''),
	('00000000-0000-0000-0000-000000000000', '0aab0ac1-95f5-43ce-b944-722728417223', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:58:04.378749+00', ''),
	('00000000-0000-0000-0000-000000000000', '1570b4e7-1102-4be7-922d-88a8c16bdce5', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:58:04.8378+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ce1eb57-5ffe-4e3f-8e96-0e63ea80ccf9', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:58:05.286451+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c737ce7b-5caf-4d8d-9e0c-491ee1638c26', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:58:05.672361+00', ''),
	('00000000-0000-0000-0000-000000000000', '953b3ef4-fc4e-4a31-9723-e105164a774d', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 10:58:05.891231+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8c20ea9-d0ce-4e75-a973-41557da5f807', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 11:09:06.931942+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea43f3d9-daf1-463a-993c-390bbafd2837', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 11:09:07.400029+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc557097-2660-4709-961d-25340fe80bc3', '{"action":"logout","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-29 11:09:07.584192+00', ''),
	('00000000-0000-0000-0000-000000000000', '6722214c-f623-48d0-9a78-0d20bde54af1', '{"action":"login","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-29 11:09:24.925881+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7e73f65-80e6-40bf-aa1e-a30ead88c0f9', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 14:48:59.996891+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5b9e8bd-de9d-4794-84d3-c7a17a7c62da', '{"action":"token_revoked","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 14:48:59.997761+00', ''),
	('00000000-0000-0000-0000-000000000000', '06496c42-ff88-4ba1-a3fe-5daa52283f54', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 14:49:03.503947+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a1965571-942f-46f9-9cd0-9093e829974d', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 17:38:04.853794+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b8a5bee-d8e7-4fac-bfdf-9b87c8b508f2', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 17:38:05.690607+00', ''),
	('00000000-0000-0000-0000-000000000000', '83b1f2f0-4b0a-4cd2-8662-ee669288d064', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 17:38:05.701505+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7620e6c-4e90-4f4c-8e52-cddef13d1667', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 17:38:06.34235+00', ''),
	('00000000-0000-0000-0000-000000000000', '54669b33-556a-4711-861a-e3ae420f8ab1', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 17:38:06.81663+00', ''),
	('00000000-0000-0000-0000-000000000000', '6099a199-d43b-46d7-ad8b-e3628d7ef842', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 17:38:08.954619+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed962e36-aad9-4de6-99d8-42e49ddb352b', '{"action":"token_refreshed","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-29 17:38:09.405367+00', ''),
	('00000000-0000-0000-0000-000000000000', '42153572-e55c-4ca4-80c7-0f24db7b4e81', '{"action":"logout","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-29 17:38:09.583132+00', ''),
	('00000000-0000-0000-0000-000000000000', '90a02ff0-0397-408d-acfc-40ffde853c1a', '{"action":"user_recovery_requested","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"user"}', '2024-10-29 17:38:19.877525+00', ''),
	('00000000-0000-0000-0000-000000000000', '77b65b5a-e7b7-42bf-ad9b-a3c5f4c5e0e4', '{"action":"login","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-29 17:39:08.203327+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7e4512b-5721-4432-8088-9fb01feadc83', '{"action":"login","actor_id":"d5532c39-101e-4bda-ba7e-9afe68180d57","actor_username":"ahad.shehbaz19@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"magiclink"}}', '2024-10-29 17:39:08.463597+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'd5532c39-101e-4bda-ba7e-9afe68180d57', 'authenticated', 'authenticated', 'ahad.shehbaz19@gmail.com', '$2a$10$UqiHBAXBEeEH0nmb69Ha.OdJxrOetD5t3sWLizIv7q2is7hD2BCzO', '2024-10-29 09:10:53.280295+00', NULL, '', '2024-10-29 09:10:32.354615+00', '', '2024-10-29 17:38:19.878108+00', '', '', NULL, '2024-10-29 17:39:08.464246+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d5532c39-101e-4bda-ba7e-9afe68180d57", "email": "ahad.shehbaz19@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2024-10-29 09:10:32.329231+00', '2024-10-29 17:39:08.466455+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('d5532c39-101e-4bda-ba7e-9afe68180d57', 'd5532c39-101e-4bda-ba7e-9afe68180d57', '{"sub": "d5532c39-101e-4bda-ba7e-9afe68180d57", "email": "ahad.shehbaz19@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-10-29 09:10:32.343204+00', '2024-10-29 09:10:32.343267+00', '2024-10-29 09:10:32.343267+00', 'b0381090-06c9-4bac-a837-90bc6efdc0d1');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('9c6e080e-b440-473b-9169-a3d587bcb729', 'd5532c39-101e-4bda-ba7e-9afe68180d57', '2024-10-29 17:39:08.464356+00', '2024-10-29 17:39:08.464356+00', NULL, 'aal1', NULL, NULL, 'node', '154.192.74.92', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('9c6e080e-b440-473b-9169-a3d587bcb729', '2024-10-29 17:39:08.466955+00', '2024-10-29 17:39:08.466955+00', 'magiclink', 'e29df854-2d5c-4944-9eef-100ddf6ebe37');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 5, 'w-H0Cp60tR-d8lArgljslg', 'd5532c39-101e-4bda-ba7e-9afe68180d57', false, '2024-10-29 17:39:08.465337+00', '2024-10-29 17:39:08.465337+00', NULL, '9c6e080e-b440-473b-9169-a3d587bcb729');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 5, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
