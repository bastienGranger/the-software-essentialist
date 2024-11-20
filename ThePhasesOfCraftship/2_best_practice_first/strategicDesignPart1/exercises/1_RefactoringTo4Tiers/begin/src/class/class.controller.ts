import { NextFunction, Request, Response, Router } from "express";
import { GetClassAssignementDTO } from "../assignment/assignment.dto";
import { AssignmentService } from "../assignment/assignment.service";
import { ErrorHandler } from "../error-handler";
import { GetStudentDTO } from "../student/student.dto";
import { StudentService } from "../student/student.service";
import { parseForResponse } from "../utils";
import {
  CreateClassDTO,
  EnrollStudentToClassDTO,
  GetClassDTO,
} from "./class.dto";
import { ClassService } from "./class.service";

export class ClassController {
  private _router: Router;

  constructor(
    private readonly classService: ClassService,
    private readonly assignmentService: AssignmentService,
    private readonly studentService: StudentService,
    private readonly errorHandler: ErrorHandler,
  ) {
    this._router = Router();
    this._router.use(this.errorHandler);
    this._router.post("/", this.createClass.bind(this));
    this._router.post("/enrollments", this.enrollStudentToClass.bind(this));
    this._router.get("/:id/assignments", this.getClassAssignements.bind(this));
  }

  public get router() {
    return this._router;
  }

  private async createClass(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = CreateClassDTO.fromRequest(req.body);
      const cls = await this.classService.createClass(dto);

      res
        .status(201)
        .json({ error: undefined, data: parseForResponse(cls), success: true });
    } catch (error) {
      next(error);
    }
  }

  private async enrollStudentToClass(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = EnrollStudentToClassDTO.fromRequest(req.body);
      const getStudentDto = GetStudentDTO.fromRequest({ id: dto.studentId });
      await this.studentService.getStudentById(getStudentDto);

      const getClsDto = GetClassDTO.fromRequest({ id: dto.classId });
      await this.classService.getClassById(getClsDto);

      const studentAlreadyEnrolledDto = EnrollStudentToClassDTO.fromRequest(
        req.body,
      );
      await this.classService.throwIfStudentAlreadyEnrolledToClass(
        studentAlreadyEnrolledDto,
      );

      const classEnrollment = await this.classService.enrollStudentToClass(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(classEnrollment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  private async getClassAssignements(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = GetClassDTO.fromRequest(req.params);
      // This is done only to throw an error if the class does not exist
      await this.classService.getClassById(dto);

      const assignments = await this.assignmentService.getAssignmentsForClass(
        GetClassAssignementDTO.fromRequest({ classId: dto.id }),
      );

      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignments),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
