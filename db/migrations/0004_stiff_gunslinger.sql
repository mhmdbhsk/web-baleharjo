CREATE TABLE "business_letter_requests" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"document_request_id" varchar(24),
	"name" text NOT NULL,
	"place_date_of_birth" text NOT NULL,
	"nik" text NOT NULL,
	"nationality" text NOT NULL,
	"religion" text NOT NULL,
	"occupation" text NOT NULL,
	"address" text NOT NULL,
	"phone_number" text NOT NULL,
	"business" text NOT NULL,
	"business_address" text NOT NULL,
	"mothers_name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "land_appraisal_letters" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"document_request_id" varchar(24),
	"name" text NOT NULL,
	"address" text NOT NULL,
	"no" text NOT NULL,
	"certificate" text NOT NULL,
	"no_c" text NOT NULL,
	"no_persil" text NOT NULL,
	"area" text NOT NULL,
	"built_on" text NOT NULL,
	"boundary_north" text NOT NULL,
	"boundary_south" text NOT NULL,
	"boundary_east" text NOT NULL,
	"boundary_west" text NOT NULL,
	"since_date" timestamp NOT NULL,
	"occupation" text NOT NULL,
	"used_for" text NOT NULL,
	"appraisal_price" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "letter_statements" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"document_request_id" varchar(24),
	"name" text NOT NULL,
	"place_date_of_birth" text NOT NULL,
	"kk_number" text NOT NULL,
	"ktp_number" text NOT NULL,
	"nationality" text NOT NULL,
	"religion" text NOT NULL,
	"occupation" text NOT NULL,
	"address" text NOT NULL,
	"marital_status" text NOT NULL,
	"letter_purpose" text NOT NULL,
	"additional_info" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "business_letter_requests" ADD CONSTRAINT "business_letter_requests_document_request_id_document_requests_id_fk" FOREIGN KEY ("document_request_id") REFERENCES "public"."document_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "land_appraisal_letters" ADD CONSTRAINT "land_appraisal_letters_document_request_id_document_requests_id_fk" FOREIGN KEY ("document_request_id") REFERENCES "public"."document_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "letter_statements" ADD CONSTRAINT "letter_statements_document_request_id_document_requests_id_fk" FOREIGN KEY ("document_request_id") REFERENCES "public"."document_requests"("id") ON DELETE cascade ON UPDATE no action;