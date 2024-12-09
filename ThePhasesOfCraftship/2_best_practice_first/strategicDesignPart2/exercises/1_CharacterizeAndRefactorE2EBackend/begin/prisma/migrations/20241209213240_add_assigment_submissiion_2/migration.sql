/*
  Warnings:

  - The primary key for the `AssignmentSubmission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `AssignmentSubmission` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "AssignmentSubmission" DROP CONSTRAINT "AssignmentSubmission_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentSubmission" DROP CONSTRAINT "AssignmentSubmission_studentId_fkey";

-- AlterTable
ALTER TABLE "AssignmentSubmission" DROP CONSTRAINT "AssignmentSubmission_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "AssignmentSubmission_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_studentId_assignmentId_fkey" FOREIGN KEY ("studentId", "assignmentId") REFERENCES "StudentAssignment"("studentId", "assignmentId") ON DELETE CASCADE ON UPDATE CASCADE;
