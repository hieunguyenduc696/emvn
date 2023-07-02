import { Response } from 'express';
import { Send, Query, Params } from 'express-serve-static-core';

export type TCreateResponse = {
  id: string;
};

export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequest<P extends Params, B, Q> extends Express.Request {
  params: P;
  body: B;
  query: Q;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

export const removeUndefinedKey = (query: unknown) => {
  return JSON.parse(JSON.stringify(query));
};

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;
