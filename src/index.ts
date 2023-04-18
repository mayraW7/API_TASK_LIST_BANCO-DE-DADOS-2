import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";
import { DatabaseConnection } from "./database/database.connection";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes());

// http://localhost:777
DatabaseConnection.connect().then(()=>{
  app.listen(process.env.PORT, () => {
  console.log(`API TaskList está rodando na porta ${process.env.PORT}!`);
  });
});