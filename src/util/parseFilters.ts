import { ExpenseFilters, ParsedExpenseFilters } from "../types/types";

export function parseFilters(body: any) {
  const parsedBody: ExpenseFilters = {
    categoryFilters: body?.categoryFilters,
    dateFilters: body?.dateFilters,
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
  };

  const { categoryFilters, dateFilters } = filters;
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
    console.log("fromDate: ", fromDate);
    console.log("toDate: ", toDate);
    parsedExpenseFilters.fromDate = fromDate;
    parsedExpenseFilters.toDate = toDate;
  }
  return parsedExpenseFilters;
}
