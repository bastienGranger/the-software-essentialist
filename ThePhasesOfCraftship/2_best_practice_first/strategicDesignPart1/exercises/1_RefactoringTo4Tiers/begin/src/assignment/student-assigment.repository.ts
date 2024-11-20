import { PrismaClient, StudentAssignment } from "@prisma/client";

export class StudentAssignmentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async save(
    studentId: string,
    assignmentId: string,
  ): Promise<StudentAssignment> {
    return await this.prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId,
      },
    });
  }

  public async getById(id: string): Promise<StudentAssignment | null> {
    return await this.prisma.studentAssignment.findUnique({
      where: {
        id,
      },
    });
  }

  public async update(
    id: string,
    options: {
      status?: "submitted";
      grade?: "A" | "B" | "C" | "D";
    },
  ) {
    return await this.prisma.studentAssignment.update({
      where: {
        id,
      },
      data: options,
    });
  }
}
