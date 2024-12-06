import { RequestHandler } from "express";
import sql from "../database/database";
import { FieldPacket, QueryResult } from "mysql2";
import { Expense } from "../types/types";

export const getExpensesController: RequestHandler = async (req, res, next) => {
  const [result, _] = (await sql.execute(`
    SELECT e.expenseAmount, c.categoryName, c.categoryId FROM expenses e
    LEFT JOIN categories c ON e.categoryId = c.categoryId
    `)) as [QueryResult, FieldPacket[]];
  const expenses = result;
  res.status(500).json({ expenses: expenses });
};
