import { AssignmentSubmission, Class } from "@prisma/client";
import { prisma } from "../../src/database";

export class GradedAssignmentBuilder {
  private grade?: "A" | "B" | "C" | "D" | "F";
  private classroom?: Class;
  private assignmentSubmission?: AssignmentSubmission;

  public constructor() {}

  withClassroom(classroom: Class) {
    this.classroom = classroom;
    return this;
  }

  fromAssignmentSubmission(assignmentSubmission: AssignmentSubmission) {
    this.assignmentSubmission = assignmentSubmission;
    return this;
  }

  withGrade(grade: "A" | "B" | "C" | "D" | "F") {
    this.grade = grade;
    return this;
  }

  async build() {
    if (!this.classroom || !this.assignmentSubmission) {
      throw new Error(
        "Classroom and AssignmentSubmission are required to build a graded assignment",
      );
    }
    return await prisma.gradedAssignment.create({
      data: {
        assignmentSubmissionId: this.assignmentSubmission.id,
        grade: this.grade ?? "A",
      },
    });
  }
}
