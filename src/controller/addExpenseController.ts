import { RequestHandler } from "express";
import sql from "../database/database";
import { Expense } from "../types/types";

export const addExpenseController: RequestHandler = async (req, res) => {
  const result = req.body;
  // Validate result before continue
  const expense: Expense = result;

  const date = expense.date;
  const formatedDate = `${date.year}-${date.month}-${date.day} ${date.hours}:${date.minutes}:${date.seconds}`;
  const userId = expense.userId;

  await sql.execute(
    "INSERT INTO expenses (expenseAmount, categoryId, date, userId) VALUES (?, ?, ?, ?)",
    [
      expense.expenseAmount,
      expense.expenseType.categoryId,
      formatedDate,
      userId,
    ],
  );
  res.status(200).json({ message: "New Expense added successfully" });
};
