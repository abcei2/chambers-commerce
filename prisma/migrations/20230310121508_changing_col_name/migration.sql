/*
  Warnings:

  - You are about to drop the column `GRUPLAC` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `gruplac` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organizations` DROP COLUMN `GRUPLAC`,
    ADD COLUMN `gruplac` VARCHAR(191) NOT NULL;
