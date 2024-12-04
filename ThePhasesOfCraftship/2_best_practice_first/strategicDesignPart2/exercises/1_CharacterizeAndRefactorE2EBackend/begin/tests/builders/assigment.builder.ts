import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { Class } from "@prisma/client";

export class AssignmentBuilder {
  private classroom?: Class;
  private title?: string;

  public constructor() { }

  public withClassroom(classroom: Class) {
    this.classroom = classroom;
    return this;
  }

  public withTitle(title: string) {
    this.title = title;
    return this;
  }

  async build() {
    if (!this.classroom) {
      throw new Error("Classroom is required to build an assignment");
    }
    return await prisma.assignment.create({
      data: {
        classId: this.classroom.id,
        title: this.title ?? faker.string.uuid(),
      },
    });
  }
}
