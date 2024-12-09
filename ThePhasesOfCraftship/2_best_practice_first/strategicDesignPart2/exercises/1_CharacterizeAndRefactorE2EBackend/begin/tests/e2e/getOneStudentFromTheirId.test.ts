import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";

import { Student } from "@prisma/client";
import { StudentBuilder } from "../builders/student.builder";
import { resetDatabase } from "../fixtures/reset";
import { app } from "../../src/index";

const feature = loadFeature(
  path.join(__dirname, "../features/getOneStudentFromId.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Sucessfully get one student from their Id", ({ given, when, then }) => {
    let response: any = {};

    let student: Student;
    given(/^I have a student named "(.*)"$/, async (name) => {
      student = await new StudentBuilder().withName(name).build();
    });

    when("I send a request to retrieve john doe from their Id", async () => {
      response = await request(app).get(`/students/${student.id}`);
    });

    then("I receive all information about john doe", () => {
      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual({
        ...student,
        assignments: [],
        classes: [],
        reportCards: [],
      });
    });
  });
});
