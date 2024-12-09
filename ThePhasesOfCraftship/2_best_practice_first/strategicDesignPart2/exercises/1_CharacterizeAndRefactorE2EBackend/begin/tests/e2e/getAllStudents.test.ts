import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { app } from "../../src/index";
import { faker } from "@faker-js/faker";
import { StudentBuilder } from "../builders/student.builder";
import { Student } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/getAllStudent.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Sucessfully get all students", ({ given, when, then }) => {
    let response: any = {};

    let student1: Student;
    let student2: Student;
    let student3: Student;

    given("I have a list of students previously created", async () => {
      student1 = await new StudentBuilder()
        .withName(faker.person.fullName())
        .withEmail(faker.internet.email())
        .build();
      student2 = await new StudentBuilder()
        .withName(faker.person.fullName())
        .withEmail(faker.internet.email())
        .build();
      student3 = await new StudentBuilder()
        .withName(faker.person.fullName())
        .withEmail(faker.internet.email())
        .build();
    });

    when("I send a request to get all of them", async () => {
      response = await request(app).get("/students");
    });

    then("I receive a formatted list of all students", async () => {
      const orderedStudentsReponse = [student1, student2, student3]
        .sort((s1, s2) => {
          if (s1.name < s2.name) return -1;
          if (s1.name > s2.name) return 1;
          return 0;
        })
        .map((student) => ({
          ...student,
          classes: [],
          assignments: [],
          reportCards: [],
        }));
      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual([...orderedStudentsReponse]);
    });
  });
});
