import express from "express";
import routes from "../routes";
import { home } from "../controllers/dailyKeywordController";
import { error } from "../controllers/errorController"
import { search } from "../controllers/searchKeywordController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
//globalRouter.get(routes.dailyKeyword, dailyKeyword);
globalRouter.get(routes.error, error);

export default globalRouter;
