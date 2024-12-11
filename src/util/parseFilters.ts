import { ExpenseFilters, ParsedExpenseFilters } from "../types/types";

export function parseFilters(body: any) {
  const parsedBody: ExpenseFilters = {
    categoryFilters: body?.categoryFilters,
    dateFilters: body?.dateFilters,
    userFilters: body?.userFilters,
  };
  return parsedBody;
}

export function parseExpenseFilters(
  filters: ExpenseFilters,
): ParsedExpenseFilters {
  const parsedExpenseFilters: ParsedExpenseFilters = {
    categoryIds: [],
    fromDate: "",
    toDate: "",
    userFilters: [],
  };

  const { categoryFilters, dateFilters, userFilters } = filters;
  if (categoryFilters.length > 0) {
    const categoryIds = filters.categoryFilters.map(
      (category) => category.categoryId,
    );
    parsedExpenseFilters.categoryIds = [...categoryIds];
  }

  if (dateFilters.from.length > 0 && dateFilters.to.length > 0) {
    const [fromDay, fromMonth, fromYear] = filters.dateFilters.from.split(".");
    const [toDay, toMonth, toYear] = filters.dateFilters.to.split(".");
    const fromDate = `${fromYear}-${fromMonth}-${fromDay}`;
    const toDate = `${toYear}-${toMonth}-${toDay}`;
    parsedExpenseFilters.fromDate = fromDate;
    parsedExpenseFilters.toDate = toDate;
  }

  if (userFilters.length > 0) {
    parsedExpenseFilters.userFilters = userFilters.map(
      (filter) => filter.userId,
    );
  }

  return parsedExpenseFilters;
}
