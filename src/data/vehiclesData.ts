import fs from "fs";
import { Collection, MongoClient } from "mongodb";

import { ListVehiclesResponse } from "./vehicleType";

const collection = "vehicles";
let vehicles: Collection;

export class VehicleData {

  public async injectDB(connection: MongoClient): Promise<void> {
    if (vehicles) { return; }
    try {
      vehicles = await connection.db(process.env.API_DATABASE_NAME).collection(collection);
    } catch (error) {
      throw new Error(`Unable to establish collection: ${error}`);
    }
  }

  public getFromFile(): Promise<ListVehiclesResponse> {
    return new Promise((resolve, reject) => {
      fs.readFile("src/data/dataProvider.json", "utf8", (err, data) => {
        if (err) {
          reject(new Error(`Unable to read data ${err}`));
        }
        const result = this.parseData(data);
        resolve(result);
      });
    });
  }

  // TODO
  public async getFromDatabase(): Promise<ListVehiclesResponse> {
    try {
      const data = await vehicles.find().toArray();

      return data;
    } catch (error) {
      throw new Error(`Unable to find comments: ${error}`);
    }
  }

  private parseData(data: string): ListVehiclesResponse {
    return JSON.parse(data);
  }
}