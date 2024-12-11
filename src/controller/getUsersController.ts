import { RequestHandler } from "express";
import sql from "../database/database";
import { FieldPacket, QueryResult } from "mysql2";
import { User } from "../types/types";

export const getUsers: RequestHandler = async (req, res) => {
  const [result, _] = (await sql.execute("SELECT * FROM users")) as [
    QueryResult,
    FieldPacket[],
  ];

  const usersArray = result as any[];

  if (!usersArray) {
    res.status(400).json({ message: "Users array undefined" });
    return;
  }
  if (usersArray.length === 0) {
    res.status(400).json({ message: "Users empty" });
    return;
  }

  const users: User[] = usersArray.map((user) => {
    return {
      userId: user?.userId,
      username: user?.username,
    };
  });

  res.status(200).json({ users: users });
};
