import { RequestHandler } from "express";
import sql from "../database/database";
import { FieldPacket, QueryResult } from "mysql2";
import { Expense } from "../types/types";
import { formatDate } from "../util/getDate";

interface SqlExpensesResult {
  id: number;
  expenseAmount: string;
  categoryName: string;
  categoryId: number;
  date: string;
}

export const getExpensesController: RequestHandler = async (req, res, next) => {
  const [result, _] = (await sql.execute(`
    SELECT e.id, e.expenseAmount, c.categoryName, c.categoryId, e.date
    FROM expenses e
    LEFT JOIN categories c ON e.categoryId = c.categoryId
    `)) as [QueryResult, FieldPacket[]];
  const expenses: SqlExpensesResult[] = result as SqlExpensesResult[];

  //Format the data
  const formatedExpenses: Expense[] = expenses.map((expense) => {
    const date = new Date(expense.date);
    return {
      expenseId: expense.id,
      expenseAmount: Number(expense?.expenseAmount),
      expenseType: {
        categoryName: expense?.categoryName,
        categoryId: expense?.categoryId,
      },
      date: formatDate(date),
    };
  });
  res.status(500).json({ expenses: formatedExpenses });
};
