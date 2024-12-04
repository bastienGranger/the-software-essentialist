import { Class, Student } from "@prisma/client";
import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import { ClassRoomBuilder } from "../builders/classroom.builder";
import { StudentBuilder } from "../builders/student.builder";

const feature = loadFeature(
  path.join(__dirname, "../features/enrollStudentToClass.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Sucessfully enroll student to class", ({ given, and, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    let classroom: Class;
    let student: Student;

    given(/^I have a class room named "(.*)"$/, async (name) => {
      classroom = await new ClassRoomBuilder().withName(name).build();
    });

    and(/^I have a student named "(.*)"$/, async (name) => {
      student = await new StudentBuilder().withName(name).build();
    });

    when("I send a request to enroll student to class", async () => {
      requestBody = {
        studentId: student.id,
        classId: classroom.id,
      };
      response = await request(app)
        .post("/class-enrollments")
        .send(requestBody);
    });

    then("The student should be enrolled to the class", () => {
      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });
});
