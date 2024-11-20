import { isMissingKeys, isUUID } from "../utils";

export class CreateStudentDTO {
  constructor(public name: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["name"];
    const isRequestInvalid =
      body && typeof body !== "object" && !isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new Error(`Invalid request: ${requiredKeys} are required`);
    }

    const { name } = body as { name: string };

    return new CreateStudentDTO(name);
  }
}

export class GetStudentDTO {
  constructor(public id: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["id"];
    const isRequestInvalid =
      body &&
      typeof body !== "object" &&
      !isMissingKeys(body, requiredKeys) &&
      !isUUID((body as any).id);

    if (isRequestInvalid) {
      throw new Error(`Invalid request: ${requiredKeys} are required`);
    }

    const { id } = body as { id: string };

    return new GetStudentDTO(id);
  }
}
