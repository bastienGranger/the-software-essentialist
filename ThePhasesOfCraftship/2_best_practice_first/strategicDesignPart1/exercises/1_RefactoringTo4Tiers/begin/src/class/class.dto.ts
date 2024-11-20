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
