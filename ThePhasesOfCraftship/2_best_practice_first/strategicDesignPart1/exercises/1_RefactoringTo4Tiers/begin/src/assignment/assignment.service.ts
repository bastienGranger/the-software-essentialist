import { Assignment, PrismaClient } from "@prisma/client";

abstract class IAssigmentService {
  abstract createAssignment(data: {
    classId: string;
    title: string;
  }): Promise<Assignment>;
  abstract getAssignmentById(id: string): Promise<Assignment | null>;
  abstract getAssignments(options: { classId: string }): Promise<Assignment[]>;
}

export class AssignmentService implements IAssigmentService {
  constructor(private readonly prisma: PrismaClient) {}

  public async createAssignment({
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

  public async getAssignmentById(id: string): Promise<Assignment | null> {
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

  public async getAssignments(options: {
    classId: string;
  }): Promise<Assignment[]> {
    return await this.prisma.assignment.findMany({
      where: {
        ...options,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });
  }
}
