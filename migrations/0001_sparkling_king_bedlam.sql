CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`model` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `idx_users_model` ON `users` (`model`);