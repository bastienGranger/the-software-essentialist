import { Assignment, PrismaClient } from "@prisma/client";

export class AssignmentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async save({
    classId,
    title,
  }: {
    classId: string;
    title: string;
  }): Promise<Assignment> {
    return await this.prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });
  }

  public async getById(id: string): Promise<Assignment | null> {
    return await this.prisma.assignment.findUnique({
      include: {
        class: true,
        studentTasks: true,
      },
      where: {
        id,
      },
    });
  }

  public async getByClassId(classId: string): Promise<Assignment[]> {
    return await this.prisma.assignment.findMany({
      where: {
        classId,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });
  }
}
