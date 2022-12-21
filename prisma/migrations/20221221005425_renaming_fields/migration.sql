/*
  Warnings:

  - You are about to drop the column `email` on the `Locations` table. All the data in the column will be lost.
  - You are about to alter the column `ri4` on the `Organizations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `Locations_email_key` ON `Locations`;

-- AlterTable
ALTER TABLE `Locations` DROP COLUMN `email`;

-- AlterTable
ALTER TABLE `Organizations` MODIFY `ri4` INTEGER NOT NULL;
