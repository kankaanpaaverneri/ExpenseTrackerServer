import { Router } from "express";
import getCategoriesController from "../controller/getCategoriesController";

const route = Router();

route.get("/get-categories", getCategoriesController);

export default route;
