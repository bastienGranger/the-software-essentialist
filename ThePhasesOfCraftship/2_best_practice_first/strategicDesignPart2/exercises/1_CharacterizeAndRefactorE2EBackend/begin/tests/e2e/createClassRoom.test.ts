import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import { ClassRoomBuilder } from "../builders/classroom.builder";

const feature = loadFeature(
  path.join(__dirname, "../features/createClassRoom.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Sucessfully create a class room", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given(/^I want to create a class room named "(.*)"$/, (name) => {
      requestBody = {
        name,
      };
    });

    when("I send a request to create a class room", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class room should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });

  test("Fail to create a class room previously created", ({
    given,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};

    given(
      /^I have a class room named "(.*)" previously created$/,
      async (name) => {
        requestBody = {
          name,
        };
        await new ClassRoomBuilder().withName(name).build();
      },
    );

    when(
      "I send a request to create a class room with the same name",
      async () => {
        response = await request(app).post("/classes").send(requestBody);
      },
    );

    then("The class room should not be created", () => {
      expect(response.status).toBe(409);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ClassAlreadyExists");
    });
  });

  test("Fail to create a class room", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    given("I want to create a class room with no name", () => {
      requestBody = {};
    });

    when("I send a request to create a class room", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class room should not be created", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ValidationError");
    });
  });
});
