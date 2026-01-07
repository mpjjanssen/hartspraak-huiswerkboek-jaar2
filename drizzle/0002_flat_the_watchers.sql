CREATE TABLE `ai_conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`workshopId` varchar(50) NOT NULL,
	`questionId` varchar(100) NOT NULL,
	`messagesEncrypted` text NOT NULL,
	`encryptionIv` varchar(255) NOT NULL,
	`messageCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_usage_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userEmail` varchar(320) NOT NULL,
	`workshopId` varchar(50) NOT NULL,
	`questionId` varchar(100) NOT NULL,
	`promptTokens` int NOT NULL,
	`completionTokens` int NOT NULL,
	`totalTokens` int NOT NULL,
	`model` varchar(100) NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ai_usage_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_answers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`workshopId` varchar(50) NOT NULL,
	`questionId` varchar(100) NOT NULL,
	`answerEncrypted` text NOT NULL,
	`encryptionIv` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_answers_id` PRIMARY KEY(`id`)
);
