import { Request, Response } from "express";
import { categories } from "../model/data";

const getCategoriesController = (req: Request, res: Response) => {
  console.log("Hello from getCategoriesController: ", req.body);
  res.status(500).json({ categories: categories });
};

export default getCategoriesController;
