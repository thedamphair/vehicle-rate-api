# Vehicle rating api 🚙

A simple API that retrives information of vehicles using NodeJS, Express, Typescript and MongoDB.

## Requirements
- [MongoDB](https://www.mongodb.com/download-center).
- [NodeJS](https://nodejs.org/en/download/releases/)

## Install & Configuration
- Run `npm i`
- Create an `.env` file with the following values
```
NODE_ENV= <productive | development>
API_ROOT= <preferably set it to "/api">
API_DATABASE_URL= <mongodb url>
API_DATABASE_NAME= <database name>
```
- Start this server with `npm run serve`
- To build run `npm run build`

## Client view
- This Api can be used with [vehicle-rating-client](https://github.com/thedamphair/vehicle-rate-client)