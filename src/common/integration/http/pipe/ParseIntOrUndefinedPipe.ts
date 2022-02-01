import { ArgumentMetadata, Injectable, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class ParseIntOrUndefinedPipe extends ParseIntPipe {
  public override async transform(value: string | undefined, metadata: ArgumentMetadata): Promise<number> {
    if (value !== undefined) {
      return super.transform(value, metadata);
    } else {
      return undefined!;
    }
  }
}
