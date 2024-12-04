import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import { faker } from "@faker-js/faker";
import { StudentBuilder } from "../builders/student.builder";

const feature = loadFeature(
  path.join(__dirname, "../features/createStudent.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Sucessfully create a student", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given(
      /^I want to create a student named "(.*)" with email "(.*)"$/,
      (name, email) => {
        requestBody = {
          name,
          email,
        };
      },
    );

    when("I send a request to create a student", async () => {
      response = await request(app).post("/students").send(requestBody);
    });

    then("The student should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual({
        id: expect.any(String), // UUID
        name: requestBody.name,
        email: requestBody.email,
      });
    });
  });

  test("Fail to create a student when no name is provided", ({
    given,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};
    given("I want to create a student with no name", () => {
      requestBody = {
        email: faker.internet.email(),
      };
    });

    when("I send a request to create a student", async () => {
      response = await request(app).post("/students").send(requestBody);
    });

    then("The student should not be created", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ValidationError");
    });
  });

  test("Fail to create a student when no email is provided", ({
    given,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};
    given("I want to create a student with no name", () => {
      requestBody = {
        name: faker.person.fullName(),
      };
    });

    when("I send a request to create a student", async () => {
      response = await request(app).post("/students").send(requestBody);
    });

    then("The student should not be created", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ValidationError");
    });
  });

  test("Fail to create a student when a student with the same email already exists", ({
    given,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};
    given(
      /^I previously created a student with email "(.*)"$/,
      async (email) => {
        await new StudentBuilder().withEmail(email).build();
        requestBody = {
          name: faker.person.fullName(),
          email,
        };
      },
    );

    when(
      "I send a request to create a student with the same email",
      async () => {
        response = await request(app).post("/students").send(requestBody);
      },
    );

    then("The student should not be created", () => {
      expect(response.status).toBe(500);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ServerError");
    });
  });
});
