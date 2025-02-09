CREATE TABLE "rt" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"number" varchar(10) NOT NULL,
	"name" varchar(255) NOT NULL,
	"rw_id" varchar(24) NOT NULL,
	"user_id" varchar(24) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rw" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"number" varchar(10) NOT NULL,
	"name" varchar(255) NOT NULL,
	"user_id" varchar(24) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "document_requests" ALTER COLUMN "rt_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "document_requests" ALTER COLUMN "rw_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rt" ADD CONSTRAINT "rt_rw_id_rw_id_fk" FOREIGN KEY ("rw_id") REFERENCES "public"."rw"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rt" ADD CONSTRAINT "rt_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rw" ADD CONSTRAINT "rw_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;