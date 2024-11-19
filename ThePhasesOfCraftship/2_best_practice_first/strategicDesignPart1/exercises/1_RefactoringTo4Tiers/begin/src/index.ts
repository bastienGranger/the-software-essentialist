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

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const assignmentRepository = new AssignmentRepository(prisma);
const assignmentService = new AssignmentService(assignmentRepository);
const assignmentController = new AssignmentController(assignmentService);

const classRepository = new ClassRepository(prisma);
const classService = new ClassService(classRepository);
const classController = new ClassController(classService, assignmentService);

const studentRepository = new StudentRepository(prisma);
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

app.use("/assignments", assignmentController.router);
app.use("/classes", classController.router);
app.use("/students", studentController.router);

// Unclassified routes for now
// POST student assigned to class
app.post("/class-enrollments", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["studentId", "classId"])) {
      return res.status(400).json({
        error: "ValidationError",
        data: undefined,
        success: false,
      });
    }

    const { studentId, classId } = req.body;

    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: "StudentNotFound",
        data: undefined,
        success: false,
      });
    }

    // check if class exists
    const cls = await prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    // check if student is already enrolled in class
    const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });

    if (duplicatedClassEnrollment) {
      return res.status(400).json({
        error: "StudentAlreadyEnrolled",
        data: undefined,
        success: false,
      });
    }

    if (!cls) {
      return res
        .status(404)
        .json({ error: "ClassNotFound", data: undefined, success: false });
    }

    const classEnrollment = await prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });

    res.status(201).json({
      error: undefined,
      data: parseForResponse(classEnrollment),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "ServerError", data: undefined, success: false });
  }
});

// POST student assigned to assignment
app.post("/student-assignments", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["studentId", "assignmentId"])) {
      return res.status(400).json({
        error: "ValidationError",
        data: undefined,
        success: false,
      });
    }

    const { studentId, assignmentId, grade } = req.body;

    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: "StudentNotFound",
        data: undefined,
        success: false,
      });
    }

    // check if assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(404).json({
        error: "AssignmentNotFound",
        data: undefined,
        success: false,
      });
    }

    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId,
      },
    });

    res.status(201).json({
      error: undefined,
      data: parseForResponse(studentAssignment),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "ServerError", data: undefined, success: false });
  }
});

// POST student submitted assignment
app.post("/student-assignments/submit", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["id"])) {
      return res.status(400).json({
        error: "ValidationError",
        data: undefined,
        success: false,
      });
    }

    const { id } = req.body;

    // check if student assignment exists
    const studentAssignment = await prisma.studentAssignment.findUnique({
      where: {
        id,
      },
    });

    if (!studentAssignment) {
      return res.status(404).json({
        error: "AssignmentNotFound",
        data: undefined,
        success: false,
      });
    }

    const studentAssignmentUpdated = await prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        status: "submitted",
      },
    });

    res.status(200).json({
      error: undefined,
      data: parseForResponse(studentAssignmentUpdated),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "ServerError", data: undefined, success: false });
  }
});

// POST student assignment graded
app.post("/student-assignments/grade", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["id", "grade"])) {
      return res.status(400).json({
        error: "ValidationError",
        data: undefined,
        success: false,
      });
    }

    const { id, grade } = req.body;

    // validate grade
    if (!["A", "B", "C", "D"].includes(grade)) {
      return res.status(400).json({
        error: "ValidationError",
        data: undefined,
        success: false,
      });
    }

    // check if student assignment exists
    const studentAssignment = await prisma.studentAssignment.findUnique({
      where: {
        id,
      },
    });

    if (!studentAssignment) {
      return res.status(404).json({
        error: "AssignmentNotFound",
        data: undefined,
        success: false,
      });
    }

    const studentAssignmentUpdated = await prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        grade,
      },
    });

    res.status(200).json({
      error: undefined,
      data: parseForResponse(studentAssignmentUpdated),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "ServerError", data: undefined, success: false });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
