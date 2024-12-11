import { RequestHandler } from "express";
import { parseLoginBody } from "../util/parseLoginBody";
import { LoginData, Account } from "../types/types";
import { validateLoginData } from "../util/validateLoginData";
import sql from "../database/database";
import { FieldPacket, QueryResult } from "mysql2";
import bcrypt from "bcrypt";

export const loginController: RequestHandler = async (req, res) => {
  const loginData: LoginData = parseLoginBody(req.body);

  if (!validateLoginData(loginData)) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  const [resultArray, _] = (await sql.execute(
    `
    SELECT * FROM users
    WHERE username = (?)
    `,
    [loginData.username],
  )) as [QueryResult, FieldPacket[]];

  const result = resultArray as Account[];
  if (result.length === 0) {
    res.status(400).json({ message: "Username not found" });
    return;
  }
  const user: Account = result[0];
  // Compare hash to loginData password
  const match = await bcrypt.compare(loginData.password, user.password);
  // Send user back if password and username matches
  if (!match) {
    res.status(400).json({ message: "Incorrect password" });

    return;
  }
  sql.execute("UPDATE currentuser SET userId = (?) WHERE id = 1", [
    user.userId,
  ]);
  res.status(200).json({ userId: user.userId, username: user.username });
};
