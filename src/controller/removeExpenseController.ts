import { RequestHandler } from "express";
import sql from "../database/database";

export const removeExpenseController: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);

  if (!id || Number.isNaN(id)) {
    res.status(500).json({ message: "Not valid Id" });
  }

  await sql.execute("DELETE FROM expenses WHERE id = (?)", [id]);
  res.status(200).json({ message: "Delete sucessful" });
};
