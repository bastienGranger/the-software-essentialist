import { Class } from "@prisma/client";
import { CreateClassDTO, GetClassDTO } from "./class.dto";
import { ClassRepository } from "./class.repository";

abstract class IAssigmentService {
  abstract createClass(dto: CreateClassDTO): Promise<Class>;
  abstract getClassById(dto: GetClassDTO): Promise<Class | null>;
}

export class ClassService implements IAssigmentService {
  constructor(private readonly repository: ClassRepository) {}

  public async createClass(dto: CreateClassDTO): Promise<Class> {
    const { name } = dto;
    return await this.repository.save(name);
  }

  public async getClassById(dto: GetClassDTO): Promise<Class | null> {
    const { id } = dto;
    return await this.repository.getById(id);
  }
}
