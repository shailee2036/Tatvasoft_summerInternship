export class PagincationModel<T> {
  public pageSize: number;

  public pageIndex: number;

  public totalPages: number;

  public totalItems: number;

  public items: T[];

  constructor(newResult: PagincationModel<T>) {
    this.pageIndex = newResult.pageIndex;
    this.pageSize = newResult.pageSize;
    this.totalPages = newResult.totalPages;
    this.items = newResult.items;
    this.totalItems = newResult.totalItems;
  }
}
