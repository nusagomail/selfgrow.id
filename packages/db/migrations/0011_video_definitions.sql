CREATE TABLE `video_definitions` (
	`content_id` text PRIMARY KEY NOT NULL,
	`video_asset_id` text,
	`poster_asset_id` text,
	`duration_seconds` integer,
	FOREIGN KEY (`content_id`) REFERENCES `content_items`(`id`) ON UPDATE no action ON DELETE cascade
);
