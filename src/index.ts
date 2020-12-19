import { ExpressApp } from "./api/expressApp";
import { appConfig } from "./config";

const expressApp = new ExpressApp(appConfig.express);

expressApp.start();