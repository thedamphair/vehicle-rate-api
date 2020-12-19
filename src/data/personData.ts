import { Collection, MongoClient } from "mongodb";
import { Person } from "./personType";

const collection = "persons";
let persons: Collection;

export class PersonData {
  public async injectDB(connection: MongoClient): Promise<void> {
    if (persons) { return; }
    try {
      persons = await connection.db(process.env.API_DATABASE_NAME).collection(collection);
    } catch (error) {
      throw new Error(`Unable to establish collection: ${error}`);
    }
  }

  public async savePerson(newPerson: Person): Promise<void> {
    try {
      await persons.insertOne(newPerson);
    } catch (error) {
      throw new Error(`Unable to save data ${error}`);
    }
  }
}