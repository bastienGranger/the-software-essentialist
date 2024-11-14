import { PrismaClient, Student, StudentAssignment } from "@prisma/client";

abstract class IStudentService {
  abstract createStudent(data: { name: string }): Promise<Student>;
  abstract getAllStudents(): Promise<Student[]>;
  abstract getStudentById(id: string): Promise<Student | null>;
  abstract getStudentAssignments(
    id: string,
    options?: {
      status?: "submitted";
      grade?: { not: null };
    },
  ): Promise<StudentAssignment[]>;
}

export class StudentService implements IStudentService {
  constructor(private readonly prisma: PrismaClient) {}

  public createStudent({ name }: { name: string }): Promise<Student> {
    return this.prisma.student.create({
      data: {
        name,
      },
    });
  }

  public getAllStudents() {
    return this.prisma.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  public getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });
  }

  public getStudentAssignments(
    id: string,
    options: { status?: "submitted"; grade?: { not: null } } = {},
  ) {
    return this.prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        ...options,
      },
      include: {
        assignment: true,
      },
    });
  }
}
