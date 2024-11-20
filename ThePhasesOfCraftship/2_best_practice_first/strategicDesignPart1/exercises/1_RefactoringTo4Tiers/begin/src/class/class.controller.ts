import { Request, Response, Router } from "express";
import { GetClassAssignementDTO } from "../assignment/assignment.dto";
import { AssignmentService } from "../assignment/assignment.service";
import { parseForResponse } from "../utils";
import { CreateClassDTO, GetClassDTO } from "./class.dto";
import { ClassService } from "./class.service";

export class ClassController {
  private _router: Router;

  constructor(
    private readonly classService: ClassService,
    private readonly assignmentService: AssignmentService,
  ) {
    this._router = Router();
    this._router.post("/", this.createClass.bind(this));
    this._router.get("/:id/assignments", this.getClassAssignements.bind(this));
  }

  public get router() {
    return this._router;
  }

  private async createClass(req: Request, res: Response) {
    try {
      const dto = CreateClassDTO.fromRequest(req.body);
      const cls = await this.classService.createClass(dto);

      res
        .status(201)
        .json({ error: undefined, data: parseForResponse(cls), success: true });
    } catch (error) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }

  private async getClassAssignements(req: Request, res: Response) {
    try {
      const dto = GetClassDTO.fromRequest(req.params);
      const cls = await this.classService.getClassById(dto);

      if (!cls) {
        return res.status(404).json({
          error: "ClassNotFound",
          data: undefined,
          success: false,
        });
      }

      const assignments = await this.assignmentService.getAssignmentsForClass(
        GetClassAssignementDTO.fromRequest({ classId: dto.id }),
      );

      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignments),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }
}
