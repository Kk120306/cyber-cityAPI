/*
  Warnings:

  - Added the required column `height` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "relativeX" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "relativeY" SET DATA TYPE DOUBLE PRECISION;
