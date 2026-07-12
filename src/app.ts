import express from "express";
import type { Express } from "express";
import { type Request, type Response } from "express";
import healthCheckRoute from "./routes/healthcheckRoute.js";
import geminiResponseRoute from "./routes/GeminiResponseRoute.js";


const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});

app.use("/api", healthCheckRoute);
app.use("/api", geminiResponseRoute);

export default app;
