/*
  Warnings:

  - A unique constraint covering the columns `[userId,costumeId,accessoryId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_costumeId_fkey`;

-- DropIndex
DROP INDEX `Favorite_costumeId_fkey` ON `Favorite`;

-- AlterTable
ALTER TABLE `Favorite` ADD COLUMN `accessoryId` INTEGER NULL,
    MODIFY `costumeId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Accessory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `colors` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Favorite_userId_costumeId_accessoryId_key` ON `Favorite`(`userId`, `costumeId`, `accessoryId`);

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_costumeId_fkey` FOREIGN KEY (`costumeId`) REFERENCES `Costume`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `Accessory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
