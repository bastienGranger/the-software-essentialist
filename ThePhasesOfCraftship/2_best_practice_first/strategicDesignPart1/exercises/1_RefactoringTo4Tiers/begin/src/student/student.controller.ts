import { Request, Response, Router } from "express";
import { parseForResponse } from "../utils";
import { CreateStudentDTO, GetStudentDTO } from "./student.dto";
import { StudentService } from "./student.service";

export class StudentController {
  private _router: Router;

  constructor(private studentService: StudentService) {
    this._router = Router();
    this._router.post("/", this.createStudent.bind(this));
    this._router.get("/", this.getAllStudents.bind(this));
    this._router.get("/:id", this.getStudentById.bind(this));
    this._router.get("/:id/assignments", this.getStudentAssignments.bind(this));
    this._router.get("/:id/grades", this.getStudentGrades.bind(this));
  }

  public get router() {
    return this._router;
  }
  private async createStudent(req: Request, res: Response) {
    try {
      const dto = CreateStudentDTO.fromRequest(req.body);
      const student = await this.studentService.createStudent(dto);

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

  private async getAllStudents(req: Request, res: Response) {
    try {
      const students = await this.studentService.getAllStudents();
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
      const dto = GetStudentDTO.fromRequest(req.params);
      const student = this.studentService.getStudentById(dto);
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
      const dto = GetStudentDTO.fromRequest(req.params);
      const student = await this.studentService.getStudentById(dto);
      if (!student) {
        return res.status(404).json({
          error: "StudentNotFound",
          data: undefined,
          success: false,
        });
      }

      const studentAssignments =
        await this.studentService.getStudentAssignments(dto);
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
      const dto = GetStudentDTO.fromRequest(req.params);
      const student = await this.studentService.getStudentById(dto);
      if (!student) {
        return res.status(404).json({
          error: "StudentNotFound",
          data: undefined,
          success: false,
        });
      }

      const studentAssignments =
        await this.studentService.getStudentAssignments(dto, {
          status: "submitted",
          grade: {
            not: null,
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
