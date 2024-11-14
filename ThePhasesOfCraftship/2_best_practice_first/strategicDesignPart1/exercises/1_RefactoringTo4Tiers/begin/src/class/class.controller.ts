import { Request, Response, Router } from "express";
import { prisma } from "../database";
import { isMissingKeys, isUUID, parseForResponse } from "../utils";

export class ClassController {
  private _router: Router;

  constructor() {
    this._router = Router();
    this._router.post("/", this.createClass.bind(this));
    this._router.get(
      "/classes/:id/assignments",
      this.getClassAssignements.bind(this),
    );
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

      const cls = await prisma.class.create({
        data: {
          name,
        },
      });

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
      const cls = await prisma.class.findUnique({
        where: {
          id,
        },
      });

      if (!cls) {
        return res.status(404).json({
          error: "ClassNotFound",
          data: undefined,
          success: false,
        });
      }

      const assignments = await prisma.assignment.findMany({
        where: {
          classId: id,
        },
        include: {
          class: true,
          studentTasks: true,
        },
      });

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
