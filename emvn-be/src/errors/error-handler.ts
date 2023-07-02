import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from './error-code';
import { ErrorException } from './error-exception';
import { ErrorModel } from './error-model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorException) {
    return next(res.status(err.status).send(err));
  } else {
    // For unhandled errors.
    return next(res.status(500).send({ code: ErrorCode.UnknownError, status: 500 } as ErrorModel));
  }
};
