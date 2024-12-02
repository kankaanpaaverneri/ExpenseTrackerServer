import { Request, Response } from "express";
import { categories } from "../model/data";
import sql from "../database/database";

const getCategoriesController = async (req: Request, res: Response) => {
  console.log("Hello from getCategoriesController: ", req.body);
  const response = await sql.execute("SHOW TABLES");
  console.log("response: ", response);
  res.status(500).json({ categories: categories });
};

export default getCategoriesController;
