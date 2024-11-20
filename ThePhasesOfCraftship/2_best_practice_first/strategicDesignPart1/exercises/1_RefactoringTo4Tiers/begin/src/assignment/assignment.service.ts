import { Assignment, StudentAssignment } from "@prisma/client";
import {
  AssignmentNotFoundException,
  StudentAssignmentNotFoundException,
  StudentNotFoundException,
} from "../error-handler";
import { StudentRepository } from "../student/student.repository";
import {
  CreateAssignmentDTO,
  GetClassAssignementDTO,
  GetAssignmentDTO,
  SubmitAssignmentDTO,
  GradeAssignmentDTO,
  AssignStudentDTO,
} from "./assignment.dto";
import { AssignmentRepository } from "./assignment.repository";
import { StudentAssignmentRepository } from "./student-assigment.repository";

abstract class IAssigmentService {
  abstract createAssignment(dto: CreateAssignmentDTO): Promise<Assignment>;
  abstract getAssignmentById(dto: GetAssignmentDTO): Promise<Assignment | null>;
  abstract getAssignmentsForClass(
    dto: GetClassAssignementDTO,
  ): Promise<Assignment[]>;
}

export class AssignmentService implements IAssigmentService {
  constructor(
    private readonly repository: AssignmentRepository,
    private readonly studentAssignmentRepo: StudentAssignmentRepository,
    private readonly studentRepo: StudentRepository,
  ) { }

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

  public async submitAssignment(
    dto: SubmitAssignmentDTO,
  ): Promise<StudentAssignment> {
    const { studentAssignmentId } = dto;
    const studentAssignment =
      await this.studentAssignmentRepo.getById(studentAssignmentId);

    if (!studentAssignment) {
      throw new StudentAssignmentNotFoundException();
    }

    return await this.studentAssignmentRepo.update(
      studentAssignment.studentId,
      {
        status: "submitted",
      },
    );
  }

  public async gradeAssignment(
    dto: GradeAssignmentDTO,
  ): Promise<StudentAssignment> {
    const { studentAssignmentId, grade } = dto;
    const studentAssignment =
      await this.studentAssignmentRepo.getById(studentAssignmentId);

    if (!studentAssignment) {
      throw new StudentAssignmentNotFoundException();
    }

    return await this.studentAssignmentRepo.update(
      studentAssignment.studentId,
      {
        grade,
      },
    );
  }

  public async assignStudent(
    dto: AssignStudentDTO,
  ): Promise<StudentAssignment> {
    const { studentId, assignmentId } = dto;
    const student = await this.studentRepo.getById(studentId);

    if (!student) {
      throw new StudentNotFoundException();
    }

    const assignment = await this.repository.getById(assignmentId);

    if (!assignment) {
      throw new AssignmentNotFoundException();
    }

    return await this.studentAssignmentRepo.save(studentId, assignmentId);
  }
}
