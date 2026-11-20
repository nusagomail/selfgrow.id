CREATE TABLE `program_day_completions` (
	`user_id` text NOT NULL,
	`program_id` text NOT NULL,
	`day` integer NOT NULL,
	`completed_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `program_id`, `day`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`program_id`) REFERENCES `programs`(`content_id`) ON UPDATE no action ON DELETE cascade
);
