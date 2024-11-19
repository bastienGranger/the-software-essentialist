import { Class, PrismaClient } from "@prisma/client";

export class ClassRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async save(name: string): Promise<Class> {
    return await this.prisma.class.create({
      data: {
        name,
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
}
