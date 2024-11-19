import { Assignment } from "@prisma/client";
import { AssignmentRepository } from "./assignment.repository";

abstract class IAssigmentService {
  abstract createAssignment(data: {
    classId: string;
    title: string;
  }): Promise<Assignment>;
  abstract getAssignmentById(id: string): Promise<Assignment | null>;
  abstract getAssignmentsForClass(classId: string): Promise<Assignment[]>;
}

export class AssignmentService implements IAssigmentService {
  constructor(private readonly repository: AssignmentRepository) {}

  public async createAssignment({
    classId,
    title,
  }: {
    classId: string;
    title: string;
  }): Promise<Assignment> {
    return await this.repository.save({
      classId,
      title,
    });
  }

  public async getAssignmentById(id: string): Promise<Assignment | null> {
    return await this.repository.getById(id);
  }

  public async getAssignmentsForClass(classId: string): Promise<Assignment[]> {
    return await this.repository.getByClassId(classId);
  }
}
