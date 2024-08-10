CREATE TABLE `conversations` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` integer NOT NULL,
	`title` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY NOT NULL,
	`conversationId` integer NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `idx_conversations_userId` ON `conversations` (`userId`);--> statement-breakpoint
CREATE INDEX `idx_messages_conversationId` ON `messages` (`conversationId`);--> statement-breakpoint
CREATE INDEX `idx_messages_role` ON `messages` (`role`);