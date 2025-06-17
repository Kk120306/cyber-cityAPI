/*
  Warnings:

  - You are about to drop the column `relativeX` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `relativeY` on the `Character` table. All the data in the column will be lost.
  - Added the required column `relativex` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relativey` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "relativeX",
DROP COLUMN "relativeY",
ADD COLUMN     "relativex" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "relativey" DOUBLE PRECISION NOT NULL;
