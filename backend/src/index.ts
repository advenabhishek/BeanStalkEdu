// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from './routes/index';
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/v1', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // Should not be done in real production code.
  next()
}, router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});