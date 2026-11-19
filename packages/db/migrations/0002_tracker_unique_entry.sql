DROP INDEX `tool_entries_user_tool_date_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `tool_entries_user_tool_date_uq` ON `tool_entries` (`user_id`,`tool_id`,`entry_date`);