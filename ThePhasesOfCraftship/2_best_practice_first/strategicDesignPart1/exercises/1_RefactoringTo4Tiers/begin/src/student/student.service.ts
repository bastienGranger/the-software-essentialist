import { Student, StudentAssignment } from "@prisma/client";
import { StudentNotFoundException } from "../error-handler";
import { CreateStudentDTO, GetStudentDTO } from "./student.dto";
import { StudentRepository } from "./student.repository";

abstract class IStudentService {
  abstract createStudent(dto: CreateStudentDTO): Promise<Student>;
  abstract getAllStudents(): Promise<Student[]>;
  abstract getStudentById(dto: GetStudentDTO): Promise<Student | null>;
  abstract getStudentAssignments(
    dto: GetStudentDTO,
    options?: {
      status?: "submitted";
      grade?: { not: null };
    },
  ): Promise<StudentAssignment[]>;
}

export class StudentService implements IStudentService {
  constructor(private readonly repository: StudentRepository) { }

  public createStudent(dto: CreateStudentDTO): Promise<Student> {
    const name = dto.name;
    return this.repository.save(name);
  }

  public getAllStudents(): Promise<Student[]> {
    return this.repository.getAll();
  }

  public getStudentById(dto: GetStudentDTO): Promise<Student | null> {
    const id = dto.id;
    const student = this.repository.getById(id);
    if (!student) {
      throw new StudentNotFoundException();
    }
    return student;
  }

  public getStudentAssignments(
    dto: GetStudentDTO,
    options: { status?: "submitted"; grade?: { not: null } } = {},
  ): Promise<StudentAssignment[]> {
    const id = dto.id;
    return this.repository.getAssignments(id, options);
  }
}
