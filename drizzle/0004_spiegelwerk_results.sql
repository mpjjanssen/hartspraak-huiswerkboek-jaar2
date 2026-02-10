CREATE TABLE `spiegelwerk_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userEmail` varchar(320) NOT NULL,
	`scoreA` int NOT NULL,
	`scoreB` int NOT NULL,
	`scoreS` int NOT NULL,
	`scoreC` int NOT NULL,
	`scoreD` int NOT NULL,
	`scoreE` int NOT NULL,
	`scoresNormI` text NOT NULL,
	`scoresNormII` text NOT NULL,
	`scoresNormIII` text NOT NULL,
	`profileType` varchar(20) NOT NULL,
	`topStructures` varchar(20) NOT NULL,
	`portraitText` longtext,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `spiegelwerk_results_id` PRIMARY KEY(`id`)
);
