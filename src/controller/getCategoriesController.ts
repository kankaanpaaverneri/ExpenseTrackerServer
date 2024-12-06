import { Request, Response } from "express";
import { categories } from "../model/data";
import sql from "../database/database";
import { Category } from "../types/types";
import { FieldPacket, QueryResult } from "mysql2";

const getCategoriesController = async (req: Request, res: Response) => {
  const response = await sql.execute("SELECT * FROM categories");
  const [categories, _] = response as [QueryResult, FieldPacket[]];
  if (!categories) {
    res.status(200).json({ categories: [] });
  }
  res.status(500).json({ categories: categories });
};

export default getCategoriesController;
