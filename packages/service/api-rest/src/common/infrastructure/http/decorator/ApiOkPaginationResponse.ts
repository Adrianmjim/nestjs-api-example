import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginationHttp } from '../model/PaginationHttp';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ApiOkPaginationResponse: <TModel extends Type>(options: {
  description: string;
  type: TModel;
}) => MethodDecorator = <TModel extends Type>(options: { description: string; type: TModel }) =>
  applyDecorators(
    ApiExtraModels(PaginationHttp, options.type),
    ApiOkResponse({
      description: options.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationHttp) },
          {
            properties: {
              items: {
                items: { $ref: getSchemaPath(options.type) },
                type: 'array',
              },
            },
          },
        ],
      },
    }),
  );
