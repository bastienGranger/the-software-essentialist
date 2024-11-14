import { Request, Response, Router } from "express";
import { isMissingKeys, isUUID, parseForResponse } from "../utils";
import { AssignmentService } from "./assignment.service";

export class AssignmentController {
  private _router: Router;

  constructor(private readonly assignmentService: AssignmentService) {
    this._router = Router();
    this._router.post("/", this.createAssignment.bind(this));
    this._router.get("/:id", this.getAssignmentById.bind(this));
  }

  public get router() {
    return this._router;
  }

  private async createAssignment(req: Request, res: Response) {
    try {
      if (isMissingKeys(req.body, ["classId", "title"])) {
        return res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
      }

      const { classId, title } = req.body;

      const assignment = await this.assignmentService.createAssignment({
        classId,
        title,
      });

      res.status(201).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }

  private async getAssignmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
      }
      const assignment = await this.assignmentService.getAssignmentById(id);

      if (!assignment) {
        return res.status(404).json({
          error: "AssignmentNotFound",
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }
}
