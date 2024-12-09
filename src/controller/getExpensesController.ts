import { Request, RequestHandler, Response } from "express";
import sql from "../database/database";
import { FieldPacket, QueryResult } from "mysql2";
import { ExpenseFilters, SqlExpensesResult } from "../types/types";
import { parseExpenseFilters, parseFilters } from "../util/parseFilters";
import { filterExpenses } from "../util/filterExpenses";
import { formatExpenses } from "../util/formatExpenses";

export const getExpensesController: RequestHandler = async (req, res) => {
  //Parse information
  const filters: ExpenseFilters = parseFilters(req.body);
  if (!filters?.categoryFilters || !filters?.dateFilters) {
    console.log("Invalid filters");
    res.end();
  }

  const parsedExpensesFilters = parseExpenseFilters(filters);
  console.log("parsedExpensesFilters: ", parsedExpensesFilters);
  const sqlQuery = filterExpenses(parsedExpensesFilters);
  console.log("sqlQuery: ", sqlQuery);

  if (sqlQuery.length > 0) {
    const [filterResult, fieldPacket] = (await sql.execute(sqlQuery, [
      ...parsedExpensesFilters.categoryIds,
    ])) as [QueryResult, FieldPacket[]];
    const expenses: SqlExpensesResult[] = filterResult as SqlExpensesResult[];
    const formatedExpenses = formatExpenses(expenses);
    res.status(200).json({ expenses: formatedExpenses });
    return;
  }

  const [result, _] = (await sql.execute(`
    SELECT e.id, e.expenseAmount, c.categoryName, c.categoryId, e.date
    FROM expenses e
    LEFT JOIN categories c ON e.categoryId = c.categoryId

    `)) as [QueryResult, FieldPacket[]];
  const expenses: SqlExpensesResult[] = result as SqlExpensesResult[];

  //Format the data
  const formatedExpenses = formatExpenses(expenses);
  res.status(200).json({ expenses: formatedExpenses });
};
