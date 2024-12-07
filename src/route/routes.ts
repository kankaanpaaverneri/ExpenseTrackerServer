import { Router } from "express";
import getCategoriesController from "../controller/getCategoriesController";
import { addNewCategoryController } from "../controller/addNewCategoryController";
import { removeCategoryController } from "../controller/removeCategoryController";
import { addExpenseController } from "../controller/addExpenseController";
import { getExpensesController } from "../controller/getExpensesController";
import { removeExpenseController } from "../controller/removeExpenseController";
const route = Router();

route.post("/add-expense", addExpenseController);
route.post("/add-new-category", addNewCategoryController);
route.delete("/remove-category/:id", removeCategoryController);
route.get("/get-expenses", getExpensesController);
route.get("/get-categories", getCategoriesController);
route.delete("/remove-expense/:id", removeExpenseController);

export default route;
