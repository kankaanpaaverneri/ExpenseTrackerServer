import { RequestHandler } from "express";
import sql from "../database/database";

export const removeCategoryController: RequestHandler = async (req, res) => {
  const categoryId = Number(req.params.id);
  if (Number.isNaN(categoryId) && !categoryId) {
    res.sendStatus(500).json({ message: "Invalid req.body" });
  }
  await sql.execute(`DELETE FROM categories WHERE categoryId = (?)`, [
    categoryId,
  ]);

  res.status(500).json({ message: "Delete successful" });
};
