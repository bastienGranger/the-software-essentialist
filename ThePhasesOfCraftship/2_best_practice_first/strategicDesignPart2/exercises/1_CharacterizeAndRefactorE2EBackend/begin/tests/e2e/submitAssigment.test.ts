import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";

import { Assignment, Class, Student } from "@prisma/client";
import { AssignmentBuilder } from "../builders/assigment.builder";
import { ClassEnrollementBuidler } from "../builders/class-enrollement.builder";
import { ClassRoomBuilder } from "../builders/classroom.builder";
import { StudentBuilder } from "../builders/student.builder";
import { resetDatabase } from "../fixtures/reset";
import { app } from "../../src/index";
import { faker } from "@faker-js/faker";

const feature = loadFeature(
  path.join(__dirname, "../features/submitAssigment.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Sucessfully submit assignment", ({ given, and, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    let student: Student;
    let assignment: Assignment;
    let classroom: Class;

    given("A student enrolled in a class", async () => {
      const studentBuilder = new StudentBuilder()
        .withName(faker.person.fullName())
        .withEmail(faker.internet.email());

      const classroomBuilder = new ClassRoomBuilder().withName(
        faker.lorem.word(1),
      );

      const classEnrollment = await new ClassEnrollementBuidler()
        .fromStudent(studentBuilder)
        .fromClassroom(classroomBuilder)
        .build();

      student = classEnrollment.student;
      classroom = classEnrollment.classRoom;
    });

    and("An assignment assigned to a class and a student", async () => {
      assignment = await new AssignmentBuilder()
        .withClassroom(classroom)
        .build();
    });

    when("The student submit his assignment", async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
      };
      response = await request(app)
        .post("/student-assignments")
        .send(requestBody);
    });

    then("The assignment should be submitted", async () => {
      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual({
        studentId: student.id,
        assignmentId: assignment.id,
        grade: null,
        status: "NOT_STARTED",
      });
    });
  });
});
