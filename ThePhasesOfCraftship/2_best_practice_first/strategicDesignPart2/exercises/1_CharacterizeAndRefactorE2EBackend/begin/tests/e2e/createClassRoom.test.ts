import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";
import { app } from "../../src/index";

const feature = loadFeature(
  path.join(__dirname, "../features/createClassRoom.feature"),
);

defineFeature(feature, (test) => {
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
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });

  test("Fail to create a class room", ({ given, when, then }) => {
    given("I want to create a class room with no name", () => {});

    when("I send a request to create a class room", () => {});

    then("the class room should not be created", () => {});
  });
});
