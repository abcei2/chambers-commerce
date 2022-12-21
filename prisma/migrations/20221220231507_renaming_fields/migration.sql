/*
  Warnings:

  - You are about to drop the column `inv_group` on the `Organizations` table. All the data in the column will be lost.
  - You are about to drop the column `rd_units` on the `Organizations` table. All the data in the column will be lost.
  - Added the required column `invGroup` to the `Organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rdUnits` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Organizations` DROP COLUMN `inv_group`,
    DROP COLUMN `rd_units`,
    ADD COLUMN `invGroup` VARCHAR(191) NOT NULL,
    ADD COLUMN `rdUnits` VARCHAR(191) NOT NULL;
