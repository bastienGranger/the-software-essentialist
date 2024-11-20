import { NextFunction, Request, Response, Router } from "express";
import { ErrorHandler } from "../error-handler";
import { parseForResponse } from "../utils";
import {
  AssignStudentDTO,
  CreateAssignmentDTO,
  GetAssignmentDTO,
  GradeAssignmentDTO,
  SubmitAssignmentDTO,
} from "./assignment.dto";
import { AssignmentService } from "./assignment.service";

export class AssignmentController {
  private _router: Router;

  constructor(
    private readonly assignmentService: AssignmentService,
    private readonly errorHandler: ErrorHandler,
  ) {
    this._router = Router();
    this._router.use(this.errorHandler);
    this._router.post("/", this.createAssignment.bind(this));
    this._router.get("/:id", this.getAssignmentById.bind(this));
    this._router.post("/submit", this.submitAssignment.bind(this));
    this._router.post("/grade", this.gradeAssignment.bind(this));
    this._router.post("/student-assigments", this.assignStudent.bind(this));
  }

  public get router() {
    return this._router;
  }

  private async createAssignment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = CreateAssignmentDTO.fromRequest(req.body);
      const assignment = await this.assignmentService.createAssignment(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  private async getAssignmentById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = GetAssignmentDTO.fromRequest(req.params);
      const assignment = await this.assignmentService.getAssignmentById(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  private async submitAssignment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = SubmitAssignmentDTO.fromRequest(req.body);
      const studentAssignment =
        await this.assignmentService.submitAssignment(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  private async gradeAssignment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = GradeAssignmentDTO.fromRequest(req.body);
      const studentAssignment =
        await this.assignmentService.gradeAssignment(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  private async assignStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = AssignStudentDTO.fromRequest(req.body);
      const studentAssignment = await this.assignmentService.assignStudent(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
