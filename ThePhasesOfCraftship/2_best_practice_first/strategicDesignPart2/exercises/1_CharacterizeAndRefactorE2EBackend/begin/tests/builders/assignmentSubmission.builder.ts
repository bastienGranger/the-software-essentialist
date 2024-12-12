import { Assignment, Student } from "@prisma/client";
import { prisma } from "../../src/database";

export class AssignmentSubmissionBuilder {
  private student?: Student;
  private assignment?: Assignment;

  public constructor() {}

  withStudent(student: Student) {
    this.student = student;
    return this;
  }

  withAssignment(assignment: Assignment) {
    this.assignment = assignment;
    return this;
  }

  async build() {
    if (!this.student || !this.assignment) {
      throw new Error(
        "Student and Assignment are required to build a student assignment",
      );
    }

    // This need to be refactored properly
    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId: this.student.id,
        assignmentId: this.assignment.id,
      },
    });

    return await prisma.assignmentSubmission.create({
      data: {
        studentId: this.student.id,
        assignmentId: this.assignment.id,
      },
    });
  }
}
