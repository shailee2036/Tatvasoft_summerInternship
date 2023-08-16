export class ErrorResult {
  constructor(key: string) {
    this.error = key;
  }

  public error!: string;
}
