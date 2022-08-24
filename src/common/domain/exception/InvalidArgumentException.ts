import { BadRequestException } from '@nestjs/common';

export class InvalidArgumentException extends BadRequestException {
  public constructor(message: string) {
    super(message);
  }
}
