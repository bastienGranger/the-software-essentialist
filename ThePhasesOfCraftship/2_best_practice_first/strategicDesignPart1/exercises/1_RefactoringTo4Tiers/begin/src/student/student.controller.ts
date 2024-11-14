import { Request, Response, Router } from "express";
import { prisma } from "../database";
import { isMissingKeys, isUUID, parseForResponse } from "../utils";

export class StudentController {
  private _router: Router;

  constructor() {
    this._router = Router();
    this._router.post("/", this.createStudent.bind(this));
    this._router.get("/", this.getStudents.bind(this));
    this._router.get("/:id", this.getStudentById.bind(this));
    this._router.get("/:id/assignments", this.getStudentAssignments.bind(this));
    this._router.get("/:id/grades", this.getStudentGrades.bind(this));
  }

  public get router() {
    return this._router;
  }
  private async createStudent(req: Request, res: Response) {
    try {
      if (isMissingKeys(req.body, ["name"])) {
        return res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
      }

      const { name } = req.body;

      const student = await prisma.student.create({
        data: {
          name,
        },
      });

      res.status(201).json({
        error: undefined,
        data: parseForResponse(student),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }

  private async getStudents(req: Request, res: Response) {
    try {
      const students = await prisma.student.findMany({
        include: {
          classes: true,
          assignments: true,
          reportCards: true,
        },
        orderBy: {
          name: "asc",
        },
      });
      res.status(200).json({
        error: undefined,
        data: parseForResponse(students),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }

  private async getStudentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
      }
      const student = await prisma.student.findUnique({
        where: {
          id,
        },
        include: {
          classes: true,
          assignments: true,
          reportCards: true,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: "StudentNotFound",
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(student),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }

  private async getStudentAssignments(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
      }

      // check if student exists
      const student = await prisma.student.findUnique({
        where: {
          id,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: "StudentNotFound",
          data: undefined,
          success: false,
        });
      }

      const studentAssignments = await prisma.studentAssignment.findMany({
        where: {
          studentId: id,
          status: "submitted",
        },
        include: {
          assignment: true,
        },
      });

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignments),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }

  private async getStudentGrades(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
      }

      // check if student exists
      const student = await prisma.student.findUnique({
        where: {
          id,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: "StudentNotFound",
          data: undefined,
          success: false,
        });
      }

      const studentAssignments = await prisma.studentAssignment.findMany({
        where: {
          studentId: id,
          status: "submitted",
          grade: {
            not: null,
          },
        },
        include: {
          assignment: true,
        },
      });

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignments),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }
}
