import app from "./app.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import dotenv from "dotenv";

dotenv.config()

const port = process.env.PORT || 8000;

try {
  app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
} catch (error: any) {
  console.log(error.message);
}
