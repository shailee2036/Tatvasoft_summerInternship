import express from "express";
import { celebrate } from "celebrate";
import { wrap } from "../base/middleware";
import { BookRepository } from "../Book/book.repository";
import { BookService } from "../Book/book.service";
import { BookController } from "../Book/book.controller";
import { BookSchema } from "../Book/book.model";

const bookRouter: express.Router = express.Router();

const repo: BookRepository = new BookRepository();
const service: BookService = new BookService(repo);
const controller: BookController = new BookController(service);

bookRouter.get("/all", wrap(controller.getAllBooks));

bookRouter.get("/", celebrate(BookSchema.all), wrap(controller.getBooks));

bookRouter.get(
  "/byId",
  celebrate(BookSchema.byId),
  wrap(controller.getBookById)
);

bookRouter.get(
  "/search",
  celebrate(BookSchema.search),
  wrap(controller.searchBook)
);

bookRouter.post("/", celebrate(BookSchema.add), wrap(controller.createBook));

bookRouter.put("/", celebrate(BookSchema.update), wrap(controller.updateBook));

bookRouter.delete("/", celebrate(BookSchema.byId), wrap(controller.deleteBook));

export default bookRouter;
