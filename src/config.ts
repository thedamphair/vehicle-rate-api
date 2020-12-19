export const nodeEnv = process.env.NODE_ENV || "development";
export const defaultPort = 3000;
export const port = process.env.PORT ? process.env.PORT : defaultPort;
export const apiRoot = process.env.API_ROOT ? process.env.API_ROOT : "/";
export const appConfig = {
  express: {
    port: port,
    mode: nodeEnv
  }
};
