import { Class, PrismaClient } from "@prisma/client";

abstract class IAssigmentService {
  abstract createClass(data: { name: string }): Promise<Class>;
  abstract getClassById(id: string): Promise<Class | null>;
}

export class ClassService implements IAssigmentService {
  constructor(private readonly prisma: PrismaClient) {}

  public async createClass({ name }: { name: string }): Promise<Class> {
    return await this.prisma.class.create({
      data: {
        name,
      },
    });
  }

  public async getClassById(id: string): Promise<Class | null> {
    return await this.prisma.class.findUnique({
      where: {
        id,
      },
    });
  }
}
