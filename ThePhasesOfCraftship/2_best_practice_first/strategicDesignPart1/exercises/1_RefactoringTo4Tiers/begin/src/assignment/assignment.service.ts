import { Assignment } from "@prisma/client";
import { AssignmentNotFoundException } from "../error-handler";
import {
  CreateAssignmentDTO,
  GetClassAssignementDTO,
  GetAssignmentDTO,
} from "./assignment.dto";
import { AssignmentRepository } from "./assignment.repository";

abstract class IAssigmentService {
  abstract createAssignment(dto: CreateAssignmentDTO): Promise<Assignment>;
  abstract getAssignmentById(dto: GetAssignmentDTO): Promise<Assignment | null>;
  abstract getAssignmentsForClass(
    dto: GetClassAssignementDTO,
  ): Promise<Assignment[]>;
}

export class AssignmentService implements IAssigmentService {
  constructor(private readonly repository: AssignmentRepository) { }

  public async createAssignment(dto: CreateAssignmentDTO): Promise<Assignment> {
    const { classId, title } = dto;
    return await this.repository.save({
      classId,
      title,
    });
  }

  public async getAssignmentById(
    dto: GetAssignmentDTO,
  ): Promise<Assignment | null> {
    const { id } = dto;
    const assignment = await this.repository.getById(id);
    if (!assignment) {
      throw new AssignmentNotFoundException();
    }

    return assignment;
  }

  public async getAssignmentsForClass(
    dto: GetClassAssignementDTO,
  ): Promise<Assignment[]> {
    const { classId } = dto;
    return await this.repository.getByClassId(classId);
  }
}
