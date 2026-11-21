CREATE TABLE `quiz_results` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`content_id` text NOT NULL,
	`quiz_id` text NOT NULL,
	`score` integer NOT NULL,
	`max_score` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`content_id`) REFERENCES `content_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `quiz_results_user_content_idx` ON `quiz_results` (`user_id`,`content_id`,`quiz_id`);