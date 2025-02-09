CREATE TABLE "document_numbers" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"number" text NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"document_request_id" varchar(24),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "document_requests" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"nik" text NOT NULL,
	"address" text NOT NULL,
	"purpose" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"rt" text NOT NULL,
	"rw" text NOT NULL,
	"rt_comment" text,
	"rw_comment" text,
	"admin_comment" text,
	"document_number" text,
	"user_id" varchar(24),
	"rt_id" varchar(24),
	"rw_id" varchar(24),
	"admin_id" varchar(24),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "document_numbers" ADD CONSTRAINT "document_numbers_document_request_id_document_requests_id_fk" FOREIGN KEY ("document_request_id") REFERENCES "public"."document_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_requests" ADD CONSTRAINT "document_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_requests" ADD CONSTRAINT "document_requests_rt_id_users_id_fk" FOREIGN KEY ("rt_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_requests" ADD CONSTRAINT "document_requests_rw_id_users_id_fk" FOREIGN KEY ("rw_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_requests" ADD CONSTRAINT "document_requests_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;