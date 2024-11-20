import { Class, ClassEnrollment, PrismaClient } from "@prisma/client";

export class ClassRepository {
  constructor(private readonly prisma: PrismaClient) { }

  public async save(name: string): Promise<Class> {
    return await this.prisma.class.create({
      data: {
        name,
      },
    });
  }

  public async createClassEnrollement({
    studentId,
    classId,
  }: {
    studentId: string;
    classId: string;
  }): Promise<ClassEnrollment> {
    return await this.prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });
  }

  public async getById(id: string): Promise<Class | null> {
    return await this.prisma.class.findUnique({
      where: {
        id,
      },
    });
  }

  public async getClassEnrollent(
    studentId: string,
    classId: string,
  ): Promise<ClassEnrollment | null> {
    return await this.prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });
  }
}
