import { nodeEnv } from "../../config";
import { ListVehiclesResponse, VehicleData } from "../../data";

export class ListVehicles {
  private readonly enviroment = "productive";
  private vehiclesData = new VehicleData();

  public async execute(): Promise<ListVehiclesResponse> {
    let result: ListVehiclesResponse;
    if (nodeEnv !== this.enviroment) {
      result = await this.vehiclesData.getFromFile();
    } else {
      result = await this.vehiclesData.getFromDatabase();
    }

    return result;
  }
}
