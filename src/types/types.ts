import { ParsedDate } from "../util/getDate";

export type Category = {
  categoryName: string;
  categoryId: number;
};

export type Expense = {
  expenseAmount: number;
  expenseType: Category;
  date: ParsedDate;
};
