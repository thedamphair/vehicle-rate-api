import bodyParser from "body-parser";
import cors from "cors";
import { Application, default as express } from "express";
import { MongoClient } from "mongodb";

import { PersonData, VehicleData } from "../data";
import { router } from "./routes/router";

export type AppConfig = {
  port: number;
  mode: string;
};
export class ExpressApp {

  private eApp: Application;
  private config: AppConfig;
  private personData = new PersonData();
  private vehicleData = new VehicleData();

  public constructor(config: AppConfig) {
    this.eApp = express();
    this.config = config;
    this.connectDB();
  }

  public start(): Application {
    if (!this.eApp) {
      this.eApp = express();
    }

    this.configApp();

    this.eApp.listen(this.config.port, () => {
      console.log(`App listening on port: ${this.config.port} in ${this.config.mode} mode.`);
    });

    return this.eApp;
  }

  private configApp(): void {
    const eApp = this.eApp;
    eApp.use(bodyParser.json());
    eApp.use(bodyParser.urlencoded({ extended: true }));
    eApp.use(cors());
    eApp.use(router);
  }

  private async connectDB (): Promise<void> {
    try {
      const uri: string = process.env.API_DATABASE_URL;
      let client = await MongoClient.connect( uri, { useNewUrlParser: true });
      await this.personData.injectDB(client);
      await this.vehicleData.injectDB(client);
    } catch (error) {
     throw new Error(error);
    }
  }
}
