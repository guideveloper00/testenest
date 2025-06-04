import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

export function CustomSwaggerDecorator(props: {
  summary: string;
  body?: {
    type: any;
    description: string;
    exampleSummary: string;
    exampleValue: any;
  };
  apiResponses: Array<{
    status: number;
    description?: string;
  }>;
}) {
  const { summary, body, apiResponses } = props;

  return applyDecorators(
    ApiOperation({ summary }),
    body
      ? ApiBody({
          description: body.description,
          type: body.type,
          examples: {
            exemplo: {
              summary: body.exampleSummary,
              value: body.exampleValue,
            },
          },
        })
      : () => {},
    ...apiResponses.map((response) =>
      ApiResponse({
        status: response.status,
        description: response.description,
      }),
    ),
  );
}
