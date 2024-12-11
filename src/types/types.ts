import { ParsedDate } from "../util/getDate";

export type Category = {
  categoryName: string;
  categoryId: number;
};

export type Expense = {
  expenseId: number;
  expenseAmount: number;
  expenseType: Category;
  userId: number;
  date: ParsedDate;
};

export interface CategoryFilters {
  categoryName: string;
  categoryId: number;
  selected: boolean;
}

export interface DateFilters {
  from: string;
  to: string;
}

export interface ExpenseFilters {
  categoryFilters: CategoryFilters[];
  dateFilters: DateFilters;
}

export interface ParsedExpenseFilters {
  categoryIds: number[];
  fromDate: string;
  toDate: string;
}

export interface SqlExpensesResult {
  id: number;
  expenseAmount: string;
  categoryName: string;
  categoryId: number;
  date: string;
  userId: number;
  username: string;
}

export interface User {
  userId: number;
  username: string;
  password: string;
}

export interface CurrentUser {
  userId: number;
  username: string;
}

export interface LoginData {
  username: string;
  password: string;
}
