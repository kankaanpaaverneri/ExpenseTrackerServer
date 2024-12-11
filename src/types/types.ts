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

export interface UserFilters {
  userId: number;
  username: string;
  selected: boolean;
}

export interface ExpenseFilters {
  categoryFilters: CategoryFilters[];
  dateFilters: DateFilters;
  userFilters: UserFilters[];
}

export interface ParsedExpenseFilters {
  categoryIds: number[];
  fromDate: string;
  toDate: string;
  userFilters: number[];
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

export interface Account {
  userId: number;
  username: string;
  password: string;
}

export interface User {
  userId: number;
  username: string;
}

export interface LoginData {
  username: string;
  password: string;
}
