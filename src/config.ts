export const nodeEnv = process.env.NODE_ENV || "development";
export const defaultPort = 3000;
export const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : defaultPort;
export const apiRoot = process.env.API_ROOT ? process.env.API_ROOT : "/";
export const appConfig = {
  express: {
    port: port,
    mode: nodeEnv
  }
};
