CREATE TABLE `shared_homework` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userEmail` varchar(320) NOT NULL,
	`workshopId` varchar(50) NOT NULL,
	`workshopNumber` int NOT NULL,
	`workshopTitle` varchar(500) NOT NULL,
	`workshopDate` varchar(100) NOT NULL,
	`pdfData` longtext NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`status` enum('pending','sent','archived') NOT NULL DEFAULT 'pending',
	`sharedAt` timestamp NOT NULL DEFAULT (now()),
	`sentAt` timestamp,
	`notes` text,
	CONSTRAINT `shared_homework_id` PRIMARY KEY(`id`)
);
