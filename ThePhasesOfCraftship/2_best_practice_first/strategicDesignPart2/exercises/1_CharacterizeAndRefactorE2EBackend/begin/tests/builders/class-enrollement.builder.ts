import { prisma } from "../../src/database";
import { ClassRoomBuilder } from "./classroom.builder";
import { StudentBuilder } from "./student.builder";

export class ClassEnrollementBuidler {
  private studentBuilder?: StudentBuilder;
  private classBuilder?: ClassRoomBuilder;

  constructor() { }

  public fromStudent(studentBuilder: StudentBuilder) {
    this.studentBuilder = studentBuilder;
    return this;
  }

  public fromClassroom(classBuilder: ClassRoomBuilder) {
    this.classBuilder = classBuilder;
    return this;
  }

  async build() {
    if (!this.studentBuilder || !this.classBuilder) {
      throw new Error(
        "Student and Class are required to build a class enrollement",
      );
    }
    const classRoom = await this.classBuilder.build();
    const student = await this.studentBuilder.build();

    const enrollement = await prisma.classEnrollment.upsert({
      where: {
        studentId_classId: {
          studentId: student.id,
          classId: classRoom.id,
        },
      },
      update: {
        studentId: student.id,
        classId: classRoom.id,
      },
      create: {
        studentId: student.id,
        classId: classRoom.id,
      },
    });

    return { student, classRoom, enrollement };
  }
}
