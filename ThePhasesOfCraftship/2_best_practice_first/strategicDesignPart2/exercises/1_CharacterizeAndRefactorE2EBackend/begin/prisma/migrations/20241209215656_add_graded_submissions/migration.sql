-- CreateTable
CREATE TABLE "GradedAssignment" (
    "id" TEXT NOT NULL,
    "assignmentSubmissionId" TEXT NOT NULL,
    "grade" TEXT,

    CONSTRAINT "GradedAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GradedAssignment_assignmentSubmissionId_key" ON "GradedAssignment"("assignmentSubmissionId");

-- AddForeignKey
ALTER TABLE "GradedAssignment" ADD CONSTRAINT "GradedAssignment_assignmentSubmissionId_fkey" FOREIGN KEY ("assignmentSubmissionId") REFERENCES "AssignmentSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
