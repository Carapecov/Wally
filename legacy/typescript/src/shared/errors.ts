export class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode = 400,
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(resource: string) {
    super(`${resource} não encontrado.`, 'NOT_FOUND', 404);
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 422);
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
  }
}
