import { Student, StudentAssignment } from "@prisma/client";
import { StudentRepository } from "./student.repository";

abstract class IStudentService {
  abstract createStudent(data: { name: string }): Promise<Student>;
  abstract getAllStudents(): Promise<Student[]>;
  abstract getStudentById(id: string): Promise<Student | null>;
  abstract getStudentAssignments(
    id: string,
    options?: {
      status?: "submitted";
      grade?: { not: null };
    },
  ): Promise<StudentAssignment[]>;
}

export class StudentService implements IStudentService {
  constructor(private readonly repository: StudentRepository) {}

  public createStudent({ name }: { name: string }): Promise<Student> {
    return this.repository.save(name);
  }

  public getAllStudents(): Promise<Student[]> {
    return this.repository.getAll();
  }

  public getStudentById(id: string): Promise<Student | null> {
    return this.repository.getById(id);
  }

  public getStudentAssignments(
    id: string,
    options: { status?: "submitted"; grade?: { not: null } } = {},
  ): Promise<StudentAssignment[]> {
    return this.repository.getAssignments(id, options);
  }
}
