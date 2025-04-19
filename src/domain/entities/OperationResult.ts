export class OperationResult {
  constructor(
    public readonly success: boolean,
    public readonly message: string,
    public readonly operationId: string,
  ) {}

  static success(message: string): OperationResult {
    return new OperationResult(true, message, crypto.randomUUID());
  }
}
