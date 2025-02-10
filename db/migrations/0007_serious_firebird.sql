ALTER TABLE "profile" ADD COLUMN "history" text;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "area" varchar(50);--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "topography" text;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "boundaries" jsonb DEFAULT '{"north":"","south":"","east":"","west":""}'::jsonb;