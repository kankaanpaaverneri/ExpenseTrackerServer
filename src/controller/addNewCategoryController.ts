import { RequestHandler } from "express";
import sql from "../database/database";

export const addNewCategoryController: RequestHandler = async (req, res) => {
  await sql.execute("INSERT INTO categories (categoryName) VALUES (?)", [
    req.body.categoryName,
  ]);
  res.status(200).json({ message: "New category inserted successfully" });
};
