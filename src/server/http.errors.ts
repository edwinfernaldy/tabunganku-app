export class BadRequestException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerException extends Error {
  constructor(message: string) {
    super(message);
  }
}
