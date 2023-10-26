import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const headers = req.headers;
    return !data ? headers : headers[data];

  }
)
