/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Costume` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Costume` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_costumeId_fkey`;

-- DropForeignKey
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_costumeId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- AlterTable
ALTER TABLE `Accessory` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `price` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Costume` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `price` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Order`;

-- DropTable
DROP TABLE `OrderItem`;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `Accessory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_costumeId_fkey` FOREIGN KEY (`costumeId`) REFERENCES `Costume`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
