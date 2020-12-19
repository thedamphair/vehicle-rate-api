import { Request, Response } from "express";

import { CodeHttp } from "../../enums";
import { AddPerson } from "../domain";

export class AddPersonController {
  private addPerson = new AddPerson();

  public async execute(req: Request, res: Response): Promise<void | Response> {
    try {
      await this.addPerson.execute(req.body);

      return res.status(CodeHttp.OK).json({message: "OK"});
    } catch (error) {
      return res.status(CodeHttp.BAD_REQUEST).json(error);
    }
  }
}