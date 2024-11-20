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
      throw new Error(`Invalid request: ${requiredKeys} are required`);
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
      throw new Error(`Invalid request: ${requiredKeys} are required`);
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
      throw new Error(`Invalid request: ${requiredKeys} are required`);
    }

    const { classId } = params as { classId: string };

    return new GetClassAssignementDTO(classId);
  }
}
