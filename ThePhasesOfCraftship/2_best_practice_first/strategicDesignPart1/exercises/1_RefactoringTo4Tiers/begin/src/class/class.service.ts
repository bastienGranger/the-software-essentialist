import { Class, ClassEnrollment } from "@prisma/client";
import {
  ClassNotFoundException,
  StudentAlreadyEnrolledException,
} from "../error-handler";
import {
  CreateClassDTO,
  EnrollStudentToClassDTO,
  GetClassDTO,
  IsStudentEnrolledDTO,
} from "./class.dto";
import { ClassRepository } from "./class.repository";

abstract class IAssigmentService {
  abstract createClass(dto: CreateClassDTO): Promise<Class>;
  abstract enrollStudentToClass(
    dto: EnrollStudentToClassDTO,
  ): Promise<ClassEnrollment>;
  abstract getClassById(dto: GetClassDTO): Promise<Class | null>;
  abstract throwIfStudentAlreadyEnrolledToClass(
    dto: IsStudentEnrolledDTO,
  ): Promise<void>;
}

export class ClassService implements IAssigmentService {
  constructor(private readonly repository: ClassRepository) { }

  public async createClass(dto: CreateClassDTO): Promise<Class> {
    const { name } = dto;
    return await this.repository.save(name);
  }

  public async enrollStudentToClass(
    dto: EnrollStudentToClassDTO,
  ): Promise<ClassEnrollment> {
    const { studentId, classId } = dto;
    return await this.repository.createClassEnrollement({
      studentId,
      classId,
    });
  }

  public async getClassById(dto: GetClassDTO): Promise<Class | null> {
    const { id } = dto;
    const cls = await this.repository.getById(id);
    if (!cls) {
      throw new ClassNotFoundException(id);
    }
    return cls;
  }

  public async throwIfStudentAlreadyEnrolledToClass(
    dto: IsStudentEnrolledDTO,
  ): Promise<void> {
    const { studentId, classId } = dto;
    const duplicatedClassEnrollment = await this.repository.getClassEnrollent(
      studentId,
      classId,
    );

    if (duplicatedClassEnrollment) {
      throw new StudentAlreadyEnrolledException();
    }
  }
}
