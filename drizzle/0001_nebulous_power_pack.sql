CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`part_id` integer,
	`question_number` integer NOT NULL,
	`question_text` text NOT NULL,
	`question_type` text NOT NULL,
	`options` text,
	`correct_answer` text,
	`marks` integer NOT NULL,
	FOREIGN KEY (`part_id`) REFERENCES `test_parts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `test_parts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`test_id` integer,
	`part_number` integer NOT NULL,
	`title` text NOT NULL,
	`instructions` text,
	`content` text,
	`audio_url` text,
	FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`duration` integer NOT NULL,
	`total_marks` integer NOT NULL,
	`created_at` text NOT NULL
);
