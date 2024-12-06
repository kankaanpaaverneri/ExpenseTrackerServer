import { RequestHandler } from "express";
import sql from "../database/database";
import { Expense } from "../types/types";

export const addExpenseController: RequestHandler = async (req, res) => {
  const result = req.body;
  // Validate result before continue
  const expense: Expense = result;

  console.log("addExpenseController: ", expense);
  await sql.execute(
    "INSERT INTO expenses (expenseAmount, categoryId) VALUES (?, ?)",
    [expense.expenseAmount, expense.expenseType.categoryId],
  );
  res.end();
};
