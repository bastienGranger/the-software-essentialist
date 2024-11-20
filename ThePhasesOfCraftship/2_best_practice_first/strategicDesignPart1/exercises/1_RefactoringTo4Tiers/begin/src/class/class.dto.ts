import { InvalidRequestBodyException } from "../error-handler";
import { isMissingKeys, isUUID } from "../utils";

export class CreateClassDTO {
  constructor(public name: string) { }

  static fromRequest(body: unknown) {
    const requiredKeys = ["name"];
    const isRequestInvalid =
      body && typeof body !== "object" && !isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { name } = body as { name: string };

    return new CreateClassDTO(name);
  }
}

export class EnrollStudentToClassDTO {
  constructor(
    public studentId: string,
    public classId: string,
  ) { }

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "classId"];
    const isRequestInvalid =
      !body ||
      typeof body !== "object" ||
      isMissingKeys(body, requiredKeys) ||
      !isUUID((body as any).studentId) ||
      !isUUID((body as any).classId);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, classId } = body as {
      studentId: string;
      classId: string;
    };

    return new EnrollStudentToClassDTO(studentId, classId);
  }
}

export class GetClassDTO {
  constructor(public id: string) { }

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

    return new GetClassDTO(id);
  }
}

export class IsStudentEnrolledDTO {
  constructor(
    public studentId: string,
    public classId: string,
  ) { }

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "classId"];
    const isRequestInvalid =
      !body ||
      typeof body !== "object" ||
      isMissingKeys(body, requiredKeys) ||
      !isUUID((body as any).studentId) ||
      !isUUID((body as any).classId);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, classId } = body as {
      studentId: string;
      classId: string;
    };

    return new IsStudentEnrolledDTO(studentId, classId);
  }
}
