import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { ClassRoomBuilder } from "../builders/classroom.builder";
import { resetDatabase } from "../fixtures/reset";
import { faker } from "@faker-js/faker";
import { StudentBuilder } from "../builders/student.builder";
import { ClassEnrollementBuidler } from "../builders/class-enrollement.builder";
import { Assignment, Class, Student } from "@prisma/client";
import { AssignmentBuilder } from "../builders/assigment.builder";
import { app } from "../../src/index";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieveAssignmentFromId.feature"),
);

defineFeature(feature, (test) => {
  let response: any;

  let assignment: Assignment;
  let classRoom: Class;

  beforeEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving an assignment", ({ given, when, then }) => {
    given("I have previously created an assignment", async () => {
      const classEnrollement = await new ClassEnrollementBuidler()
        .fromClassroom(new ClassRoomBuilder().withName(faker.lorem.word(1)))
        .fromStudent(
          new StudentBuilder()
            .withName(faker.person.fullName())
            .withEmail(faker.internet.email()),
        )
        .build();

      classRoom = classEnrollement.classRoom;

      assignment = await new AssignmentBuilder()
        .withClassroom(classRoom)
        .build();
    });

    when("I request the assignment with its id", async () => {
      response = await request(app).get(`/assignments/${assignment.id}`);
    });

    then("I should receive the assignment's details", () => {
      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual({
        id: assignment.id,
        classId: assignment.classId,
        title: assignment.title,
        class: {
          id: classRoom.id,
          name: classRoom.name,
        },
        studentTasks: [],
      });
    });
  });
});
