import express, { Request, Response } from "express";
import { prisma } from "./database";
import { isMissingKeys, parseForResponse } from "./utils";
import { AssignmentController } from "./assignment/assignment.controller";
import { AssignmentService } from "./assignment/assignment.service";
import { ClassController } from "./class/class.controller";
import { StudentController } from "./student/student.controller";
import { StudentService } from "./student/student.service";
import { ClassService } from "./class/class.service";
import { StudentRepository } from "./student/student.repository";
import { ClassRepository } from "./class/class.repository";
import { AssignmentRepository } from "./assignment/assignment.repository";
import { errorHandler } from "./error-handler";
import { StudentAssignmentRepository } from "./assignment/student-assigment.repository";

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const studentRepository = new StudentRepository(prisma);
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService, errorHandler);
const studentAssignmentRepository = new StudentAssignmentRepository(prisma);
const assignmentRepository = new AssignmentRepository(prisma);
const assignmentService = new AssignmentService(
  assignmentRepository,
  studentAssignmentRepository,
  studentRepository,
);
const assignmentController = new AssignmentController(
  assignmentService,
  errorHandler,
);

const classRepository = new ClassRepository(prisma);
const classService = new ClassService(classRepository);
const classController = new ClassController(
  classService,
  assignmentService,
  studentService,
  errorHandler,
);

app.use("/assignments", assignmentController.router);
app.use("/classes", classController.router);
app.use("/students", studentController.router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
