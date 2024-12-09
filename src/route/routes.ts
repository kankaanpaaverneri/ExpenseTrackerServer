import { Router } from "express";
import getCategoriesController from "../controller/getCategoriesController";
import { addNewCategoryController } from "../controller/addNewCategoryController";
import { removeCategoryController } from "../controller/removeCategoryController";
import { addExpenseController } from "../controller/addExpenseController";
import { getExpensesController } from "../controller/getExpensesController";
import { removeExpenseController } from "../controller/removeExpenseController";
import { addNewUserController } from "../controller/addNewUserController";
const route = Router();

route.post("/add-expense", addExpenseController);
route.post("/add-new-category", addNewCategoryController);
route.delete("/remove-category/:id", removeCategoryController);
route.post("/get-expenses", getExpensesController);
route.post("/get-categories", getCategoriesController);
route.delete("/remove-expense/:id", removeExpenseController);
route.post("/add-new-user", addNewUserController);

export default route;
