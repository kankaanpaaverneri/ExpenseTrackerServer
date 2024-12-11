import { RequestHandler } from "express";
import sql from "../database/database";
import { FieldPacket, QueryResult } from "mysql2";
import { User } from "../types/types";

export const getCurrentUserController: RequestHandler = async (req, res) => {
  const [result, _] = await sql.execute(`
    SELECT * FROM users u
    LEFT JOIN currentuser cu ON cu.userId = u.userId
    WHERE u.userId = cu.userId
    `);

  const resultArray = result as unknown[];

  if (resultArray.length === 0) {
    res.status(200).json({
      user: {
        userId: 0,
        username: "",
      },
    });
    return;
  }

  if (!resultArray[0]) {
    res.status(400).json({ message: "Queryresult undefined" });
    return;
  }

  const { userId, username }: User = resultArray[0] as User;
  if (!userId || !username) {
    res.status(400).json({ message: "Queryresult undefined" });
  }
  res.status(200).json({ userId: userId, username: username });
};
