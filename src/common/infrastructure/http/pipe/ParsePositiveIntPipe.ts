import { ArgumentMetadata, BadRequestException, Injectable, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class ParsePositiveIntPipe extends ParseIntPipe {
  public override async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const result: number = await super.transform(value, metadata);

    if (result < 1) {
      throw new BadRequestException(`${metadata.data} must be a positive number string`);
    }

    return result;
  }
}
