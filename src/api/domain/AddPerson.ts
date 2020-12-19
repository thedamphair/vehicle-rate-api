import { nodeEnv } from "../../config";
import { Person, PersonData } from "../../data";

export class AddPerson {
  private readonly enviroment = "productive";
  private personData = new PersonData();

  public async execute(bodyPerson): Promise<void> {
    const newPerson: Person = {
      name: bodyPerson.name,
      estimatedDate: bodyPerson.estimatedDate
    };
    if (nodeEnv === this.enviroment) {
      await this.personData.savePerson(newPerson);
    }
  }
}