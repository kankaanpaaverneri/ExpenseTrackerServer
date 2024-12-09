import { RequestHandler } from "express";
import { parseLoginBody } from "../util/parseLoginBody";
import { LoginData } from "../types/types";
import { validateLoginData } from "../util/validateLoginData";

export const loginController: RequestHandler = (req, res) => {
  const loginData: LoginData = parseLoginBody(req.body);

  if (!validateLoginData(loginData)) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }
  console.log("loginController: ", loginData);

  // fetch data from database
  // Compare hash to loginData password
  // Send user back if password and username matches

  res.status(200).json({ message: "Login success" });
};
