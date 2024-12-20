import { ParsedExpenseFilters } from "../types/types";

function getPlaceholdersByAmount(amount: number): string {
  let placeholders = "";
  let index = 0;
  while (index < amount) {
    if (index === amount - 1) {
      placeholders += "?";
    } else {
      placeholders += "?, ";
    }
    index += 1;
  }
  return placeholders;
}

function filterCategories(categoryIds: number[]): string {
  return `
  e.categoryId IN (${getPlaceholdersByAmount(categoryIds.length)})
  `;
}

function filterDates(fromDate: string, toDate: string): string {
  return `DATE(e.date) BETWEEN '${fromDate}' AND '${toDate}'`;
}

function filterUsers(userFilters: number[]): string {
  return `e.userId IN (${getPlaceholdersByAmount(userFilters.length)})`;
}

export function filterExpenses({
  categoryIds,
  fromDate,
  toDate,
  userFilters,
}: ParsedExpenseFilters): string {
  let sqlQuery = ``;

  if (
    categoryIds.length > 0 ||
    (fromDate.length > 0 && toDate.length > 0) ||
    userFilters.length > 0
  ) {
    sqlQuery += `
    SELECT e.id, e.expenseAmount, c.categoryName, e.date, u.userId, u.username
    FROM expenses e
    LEFT JOIN categories c ON e.categoryId = c.categoryId
    LEFT JOIN users u ON e.userId = u.userId
    WHERE
    `;
  }

  if (categoryIds.length > 0) {
    const filterCategoriesQuery = filterCategories(categoryIds);
    sqlQuery += `${filterCategoriesQuery}`;
  }

  if (fromDate.length > 0 && toDate.length > 0) {
    if (categoryIds.length > 0) {
      sqlQuery += " AND ";
    }
    sqlQuery += `
    ${filterDates(fromDate, toDate)}
    `;
  }

  if (userFilters.length > 0) {
    if (categoryIds.length > 0 || (fromDate.length > 0 && toDate.length > 0)) {
      sqlQuery += " AND ";
    }
    sqlQuery += `
    ${filterUsers(userFilters)}
    `;
  }

  return sqlQuery;
}
