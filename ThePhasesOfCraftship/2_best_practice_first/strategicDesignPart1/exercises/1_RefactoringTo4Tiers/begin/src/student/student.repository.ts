import { PrismaClient, Student, StudentAssignment } from "@prisma/client";

export class StudentRepository {
  constructor(private readonly prisma: PrismaClient) { }

  public async save(name: string): Promise<Student> {
    return await this.prisma.student.create({
      data: {
        name,
      },
    });
  }

  public async getAll(): Promise<Student[]> {
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

  public getById(id: string): Promise<Student | null> {
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

  public getAssignments(
    studentId: string,
    options: { status?: "submitted"; grade?: { not: null } } = {},
  ): Promise<StudentAssignment[]> {
    return this.prisma.studentAssignment.findMany({
      where: {
        studentId,
        ...options,
      },
      include: {
        assignment: true,
      },
    });
  }
}
