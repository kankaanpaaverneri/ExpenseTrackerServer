import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import route from "./route/routes";
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", route);

const port = 3000;
app.listen(port, () => {
  console.log("Listening...");
});
