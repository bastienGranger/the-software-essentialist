import { NextFunction, Request, Response, Router } from "express";
import { GetClassAssignementDTO } from "../assignment/assignment.dto";
import { AssignmentService } from "../assignment/assignment.service";
import { ErrorHandler } from "../error-handler";
import { parseForResponse } from "../utils";
import { CreateClassDTO, GetClassDTO } from "./class.dto";
import { ClassService } from "./class.service";

export class ClassController {
  private _router: Router;

  constructor(
    private readonly classService: ClassService,
    private readonly assignmentService: AssignmentService,
    private readonly errorHandler: ErrorHandler,
  ) {
    this._router = Router();
    this._router.use(this.errorHandler);
    this._router.post("/", this.createClass.bind(this));
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
