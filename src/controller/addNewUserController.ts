import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { parseNewUserBody } from "../util/parseNewUserBody";
import { validateNewUser } from "../util/validateNewUser";
import { Account } from "../types/types";
import sql from "../database/database";

export const addNewUserController: RequestHandler = async (req, res) => {
  console.log("addNewUserController: ", req.body);
  const user: Account = parseNewUserBody(req.body);
  if (!validateNewUser(user.userId, user.username, user.password)) {
    console.error("Not valid user");
    res.status(400).json("Not valid user");
    return;
  }

  const cryptedPassword = await bcrypt.hash(req.body.password, 12);
  // Insert username and crypted password to database
  await sql.execute(`INSERT INTO users (username, password) VALUES (?, ?)`, [
    user.username,
    cryptedPassword,
  ]);

  res.status(200).json({ message: "New user created succesfully" });
};
