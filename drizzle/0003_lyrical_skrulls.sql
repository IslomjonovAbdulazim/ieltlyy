CREATE TABLE `payme_orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`product_id` text NOT NULL,
	`amount` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payme_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`payme_transaction_id` text NOT NULL,
	`order_id` text NOT NULL,
	`amount` integer NOT NULL,
	`state` integer NOT NULL,
	`create_time` integer NOT NULL,
	`perform_time` integer,
	`cancel_time` integer,
	`reason` integer,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payme_transactions_payme_transaction_id_unique` ON `payme_transactions` (`payme_transaction_id`);