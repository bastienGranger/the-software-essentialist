import { Student } from "@prisma/client";
import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";

export class StudentBuilder {
  private student: Partial<Student> = {};

  constructor() { }

  public withName(name: string) {
    this.student = {
      ...this.student,
      name,
    };
    return this;
  }

  public withEmail(email?: string) {
    this.student = {
      ...this.student,
      email: email ?? faker.internet.email(),
    };
    return this;
  }

  async build() {
    return await prisma.student.create({
      data: {
        name: this.student.name ?? "",
        email: this.student.email ?? "",
      },
    });
  }
}
