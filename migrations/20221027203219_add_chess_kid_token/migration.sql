-- CreateTable
CREATE TABLE `chessKidToken` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chessKidToken` ADD CONSTRAINT `chessKidToken_id_fkey` FOREIGN KEY (`id`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
