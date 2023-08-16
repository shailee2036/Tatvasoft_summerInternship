import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errors } from "celebrate";
import { connectDatabase } from "./Database/DatabaseConfig";
import bodyParser from "body-parser";
import router from "./Routers/index.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//connect database
connectDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// API router
app.use("/api", router);

//Using celebrate errors
app.use(errors());

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
