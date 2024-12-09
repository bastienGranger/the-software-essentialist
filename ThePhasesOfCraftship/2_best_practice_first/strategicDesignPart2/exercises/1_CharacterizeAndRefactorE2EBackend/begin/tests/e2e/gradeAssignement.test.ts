import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";

import { Assignment, AssignmentSubmission, Class, Student } from "@prisma/client";
import { AssignmentBuilder } from "../builders/assigment.builder";
import { ClassRoomBuilder } from "../builders/classroom.builder";
import { StudentBuilder } from "../builders/student.builder";
import { resetDatabase } from "../fixtures/reset";
import { app } from "../../src/index";
import { faker } from "@faker-js/faker";
import { AssigmentSubmissionBuilder } from "../builders/student-assignement.builder";

const feature = loadFeature(
  path.join(__dirname, "../features/gradeAssignment.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Successfully grade assignment", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    let student: Student;
    let assignment: Assignment;
    let classroom: Class;
    let assignmentSubmission: AssignmentSubmission;

    given("A student submitted an assignment", async () => {
      student = await new StudentBuilder()
        .withName(faker.person.fullName())
        .withEmail(faker.internet.email())
        .build();
      classroom = await new ClassRoomBuilder()
        .withName(faker.lorem.word(1))
        .build();
      assignment = await new AssignmentBuilder()
        .withClassroom(classroom)
        .withTitle(faker.lorem.words(5))
        .build();

      assignmentSubmission = await new AssigmentSubmissionBuilder()
        .withStudent(student)
        .withAssignment(assignment)
        .build();

    });

    when("Teacher submit grade for assignment", async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
        grade: "A",
      };
      response = await request(app)
        .post("/student-assignments/grade")
        .send(requestBody);
    });

    then("Assignment should be marked as graded", async () => {
      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual({
        id: expect.any(String), // Should be a UUID
        grade: "A",
        assignmentSubmissionId: assignmentSubmission.id,
      });
    });
  });
});
