import { Class } from "@prisma/client";
import { prisma } from "../../src/database";

export class ClassRoomBuilder {
  private classRoom: Partial<Class> = {};

  constructor() {}

  public withName(name: string) {
    this.classRoom = {
      ...this.classRoom,
      name,
    };
    return this;
  }

  public async build() {
    return await prisma.class.create({
      data: {
        name: this.classRoom.name ?? "",
      },
    });
  }
}
