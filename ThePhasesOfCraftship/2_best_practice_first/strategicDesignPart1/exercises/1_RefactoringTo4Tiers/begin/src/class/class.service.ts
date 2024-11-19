import { Class } from "@prisma/client";
import { ClassRepository } from "./class.repository";

abstract class IAssigmentService {
  abstract createClass(data: { name: string }): Promise<Class>;
  abstract getClassById(id: string): Promise<Class | null>;
}

export class ClassService implements IAssigmentService {
  constructor(private readonly repository: ClassRepository) {}

  public async createClass({ name }: { name: string }): Promise<Class> {
    return await this.repository.save(name);
  }

  public async getClassById(id: string): Promise<Class | null> {
    return await this.repository.getById(id);
  }
}
