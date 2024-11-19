import { Request, Response, Router } from "express";
import { AssignmentService } from "../assignment/assignment.service";
import { isMissingKeys, isUUID, parseForResponse } from "../utils";
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
      if (isMissingKeys(req.body, ["name"])) {
        return res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
      }

      const { name } = req.body;

      const cls = await this.classService.createClass(name);

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
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
      }

      // check if class exists
      const cls = await this.classService.getClassById(id);

      if (!cls) {
        return res.status(404).json({
          error: "ClassNotFound",
          data: undefined,
          success: false,
        });
      }

      const assignments =
        await this.assignmentService.getAssignmentsForClass(id);

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
