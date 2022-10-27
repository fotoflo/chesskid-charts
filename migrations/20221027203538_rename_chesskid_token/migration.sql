/*
  Warnings:

  - You are about to drop the `chessKidToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chessKidToken` DROP FOREIGN KEY `chessKidToken_id_fkey`;

-- DropTable
DROP TABLE `chessKidToken`;

-- CreateTable
CREATE TABLE `chesskidToken` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chesskidToken` ADD CONSTRAINT `chesskidToken_id_fkey` FOREIGN KEY (`id`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
