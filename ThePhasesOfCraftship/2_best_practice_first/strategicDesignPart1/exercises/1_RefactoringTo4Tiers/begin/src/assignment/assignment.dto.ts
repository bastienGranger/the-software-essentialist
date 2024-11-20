import { InvalidRequestBodyException } from "../error-handler";
import { isMissingKeys, isUUID } from "../utils";

export class CreateAssignmentDTO {
  constructor(
    public classId: string,
    public title: string,
  ) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["classId", "title"];
    const isRequestInvalid =
      body && typeof body !== "object" && !isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { classId, title } = body as { classId: string; title: string };

    return new CreateAssignmentDTO(classId, title);
  }
}

export class GetAssignmentDTO {
  constructor(public id: string) {}

  static fromRequest(params: unknown) {
    const requiredKeys = ["id"];
    const isRequestInvalid =
      params &&
      typeof params !== "object" &&
      !isMissingKeys(params, requiredKeys) &&
      !isUUID((params as any).id);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { id } = params as { id: string };

    return new GetAssignmentDTO(id);
  }
}

export class GetClassAssignementDTO {
  constructor(public classId: string) {}

  static fromRequest(params: unknown) {
    const requiredKeys = ["classId"];
    const isRequestInvalid =
      params &&
      typeof params !== "object" &&
      !isMissingKeys(params, requiredKeys) &&
      !isUUID((params as any).id);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { classId } = params as { classId: string };

    return new GetClassAssignementDTO(classId);
  }
}

export class SubmitAssignmentDTO {
  constructor(public studentAssignmentId: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentAssignmentId"];
    const isRequestInvalid =
      body &&
      typeof body !== "object" &&
      !isMissingKeys(body, requiredKeys) &&
      !isUUID((body as any).id);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentAssignmentId } = body as { studentAssignmentId: string };

    return new SubmitAssignmentDTO(studentAssignmentId);
  }
}

export class GradeAssignmentDTO {
  constructor(
    public studentAssignmentId: string,
    public grade: "A" | "B" | "C" | "D",
  ) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentAssignmentId", "grade"];
    const isRequestInvalid =
      body &&
      typeof body !== "object" &&
      !isMissingKeys(body, requiredKeys) &&
      !isUUID(
        (body as any).studentAssignmentId &&
          !["A", "B", "C", "D"].includes((body as any).grade),
      );

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentAssignmentId, grade } = body as {
      studentAssignmentId: string;
      grade: "A" | "B" | "C" | "D";
    };

    return new GradeAssignmentDTO(studentAssignmentId, grade);
  }
}

export class AssignStudentDTO {
  constructor(
    public studentId: string,
    public assignmentId: string,
  ) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "assignmentId"];
    const isRequestInvalid =
      body &&
      typeof body !== "object" &&
      !isMissingKeys(body, requiredKeys) &&
      !isUUID((body as any).studentId) &&
      !isUUID((body as any).assignmentId);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, assignmentId } = body as {
      studentId: string;
      assignmentId: string;
    };

    return new AssignStudentDTO(studentId, assignmentId);
  }
}
