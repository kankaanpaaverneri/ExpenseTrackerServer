import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { parseNewUserBody } from "../util/parseNewUserBody";
import { validateNewUser } from "../util/validateNewUser";
import { User } from "../types/types";

export const addNewUserController: RequestHandler = async (req, res) => {
  console.log("addNewUserController: ", req.body);
  const user: User = parseNewUserBody(req.body);
  if (!validateNewUser(user.userId, user.username, user.password)) {
    console.error("Not valid user");
    res.status(400).json("Not valid user");
    return;
  }

  const cryptedPassword = await bcrypt.hash(req.body.password, 12);
  // Insert username and crypted password to database
  res.status(200).json({ message: "New user created succesfully" });
};
