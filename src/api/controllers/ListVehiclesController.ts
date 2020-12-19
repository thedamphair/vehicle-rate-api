import { Request, Response } from "express";

import { CodeHttp } from "../../enums";
import { ListVehicles } from "../domain";

export class ListVehiclesController {
  private listVehicles = new ListVehicles();

  public async execute(req: Request, res: Response): Promise<void | Response> {
    try {
      const result = await this.listVehicles.execute();

      return res.status(CodeHttp.OK).json(result);
    } catch (error) {
      return res.status(CodeHttp.BAD_REQUEST).json(error);
    }
  }
}