import { Class } from "@prisma/client";
import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import { faker } from "@faker-js/faker";
import { ClassRoomBuilder } from "../builders/classroom.builder";

const feature = loadFeature(
  path.join(__dirname, "../features/createAssignmentForClass.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Sucessfully create an assignment", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let classroom: Class;
    let title: string;

    given("I have a class room", async () => {
      classroom = await new ClassRoomBuilder().withName(faker.word.noun()).build();
    });

    when("I create a assignment for the class", async () => {
      title = faker.word.interjection()
      requestBody = {
        classId: classroom.id,
        title
      };
      response = await request(app).post("/assignments").send(requestBody);
    });

    then("The assignment should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual({
        id: expect.any(String), // UUID
        classId: classroom.id,
        title,
      });
    });
  });
});
