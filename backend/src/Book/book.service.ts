import { PagincationModel } from "../base/paginationModel";
import { Result } from "../base/resultModel";
import { BookModel } from "./book.model";
import { BookRepository } from "./book.repository";

export class BookService {
  constructor(private readonly bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  public async getBooks(
    pageSize: number,
    pageIndex: number,
    keyword?: string
  ): Promise<Result<PagincationModel<BookModel>>> {
    return this.bookRepository.getBooks(pageSize, pageIndex, keyword);
  }

  public async getById(bookId: number): Promise<Result<BookModel | null>> {
    return this.bookRepository.getById(bookId);
  }

  public async getAllBooks(): Promise<Result<BookModel[]>> {
    return this.bookRepository.getAllBooks();
  }

  public async updateBook(
    bookDetail: BookModel
  ): Promise<Result<BookModel | null>> {
    return this.bookRepository.updateBook(bookDetail);
  }

  public async createBook(bookDetail: BookModel) {
    return this.bookRepository.createBook(bookDetail);
  }

  public async deleteBook(bookId: number) {
    return this.bookRepository.deleteBook(bookId);
  }

  public async searchBook(keyword: string) {
    return this.bookRepository.searchBook(keyword);
  }
}
