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

const feature = loadFeature(
  path.join(__dirname, "../features/assignAssignementToStudent.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Assign a student to an assignment", ({ given, and, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    const studentBuilder = new StudentBuilder();
    const classroomBuilder = new ClassRoomBuilder();
    const classEnrollmentBuilder = new ClassEnrollementBuidler();
    const assignmentBuilder = new AssignmentBuilder();
    let student: Student;
    let classroom: Class;
    let assignment: Assignment;

    given("There is an existing student enrolled to a class", async () => {
      const enrollmentResult = await classEnrollmentBuilder
        .fromClassroom(classroomBuilder.withName("Math"))
        .fromStudent(
          studentBuilder.withName("Johnny").withEmail("johnny@example.com"),
        )
        .build();
      student = enrollmentResult.student;
      classroom = enrollmentResult.classRoom;
    });

    and("An assignment exists for the class", async () => {
      assignment = await assignmentBuilder
        .withClassroom(classroom)
        .withTitle("Math Homework")
        .build();
    });

    when("I assign the student the assignment", async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
      };
      response = await request(app)
        .post("/student-assignments")
        .send(requestBody);
    });

    then("The student should be assigned to the assignment", async () => {
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
