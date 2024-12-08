import { SqlExpensesResult, Expense } from "../types/types";
import { formatDate } from "./getDate";
export function formatExpenses(expenses: SqlExpensesResult[]): Expense[] {
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
  return formatedExpenses;
}
