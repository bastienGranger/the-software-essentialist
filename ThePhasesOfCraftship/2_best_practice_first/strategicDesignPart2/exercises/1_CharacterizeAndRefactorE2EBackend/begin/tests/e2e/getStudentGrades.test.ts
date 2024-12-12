import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";

import { resetDatabase } from "../fixtures/reset";
import { app } from "../../src/index";
import { faker } from "@faker-js/faker";
import { StudentBuilder } from "../builders/student.builder";
import { AssignmentSubmission, Class } from "@prisma/client";
import { AssignmentSubmissionBuilder } from "../builders/assignmentSubmission.builder";
import { AssignmentBuilder } from "../builders/assigment.builder";
import { ClassEnrollementBuidler } from "../builders/class-enrollement.builder";
import { ClassRoomBuilder } from "../builders/classroom.builder";
import { GradedAssignmentBuilder } from "../builders/gradedAssignment.builder";

const feature = loadFeature(
  path.join(__dirname, "../features/getStudentGrades.feature"),
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieve student's grades", ({
    given,
    and,
    when,
    then,
  }) => {
    let response: any = {};

    let classroom: Class;
    let assignmentSubmission: AssignmentSubmission;

    given("A student has submitted assignments", async () => {
      const enrollement = await new ClassEnrollementBuidler()
        .fromStudent(
          new StudentBuilder()
            .withName(faker.person.fullName())
            .withEmail(faker.internet.email()),
        )
        .fromClassroom(new ClassRoomBuilder().withName(faker.word.noun(1)))
        .build();

      classroom = enrollement.classRoom;
      const student = enrollement.student;

      const assignment = await new AssignmentBuilder()
        .withClassroom(classroom)
        .build();

      assignmentSubmission = await new AssignmentSubmissionBuilder()
        .withStudent(student)
        .withAssignment(assignment)
        .build();
    });

    and("A Teacher has grades the student's assignments", async () => {
      await new GradedAssignmentBuilder()
        .withClassroom(classroom)
        .fromAssignmentSubmission(assignmentSubmission)
        .withGrade("A")
        .build();
    });

    when("The Student requests their grades", async () => {
      response = await request(app).get(
        `/student/${assignmentSubmission.studentId}/grades`,
      );
    });

    then("The student receive the list of all their grades", async () => {
      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual([
        {
          assignmentSubmission: {
            assignmentId: assignmentSubmission.assignmentId,
            id: assignmentSubmission.id,
            studentAssignment: {
              assignmentId: assignmentSubmission.assignmentId,
              // TODO: This should probably be the same as the grade which means
              // that there is an issue here.
              grade: null,
              status: "NOT_STARTED",
              studentId: assignmentSubmission.studentId,
            },
            studentId: assignmentSubmission.studentId,
          },
          assignmentSubmissionId: assignmentSubmission.id,
          grade: "A",
          id: expect.any(String),
        },
      ]);
    });
  });
});
