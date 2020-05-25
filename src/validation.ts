import { ValidationError } from 'class-validator';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

export function validationError(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Array && err[0] instanceof ValidationError) {
    res.status(400).json({errors: err}).end();
  } else {
    next(err);
  }
}