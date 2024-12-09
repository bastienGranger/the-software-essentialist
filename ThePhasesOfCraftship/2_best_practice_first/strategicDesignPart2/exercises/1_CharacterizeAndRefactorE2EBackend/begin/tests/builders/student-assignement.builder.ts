import { Assignment, Student } from "@prisma/client";
import { prisma } from "../../src/database";

export class AssigmentSubmissionBuilder {
  private student?: Student;
  private assignment?: Assignment;

  public constructor() {}

  public withStudent(student: Student) {
    this.student = student;
    return this;
  }

  public withAssignment(assignment: Assignment) {
    this.assignment = assignment;
    return this;
  }

  async build() {
    if (!this.student?.id || !this.assignment?.id) {
      throw new Error(
        "Student and Assignment are required to build a student assignment",
      );
    }

    await prisma.studentAssignment.create({
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
