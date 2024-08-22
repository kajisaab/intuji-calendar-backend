import { StatusCode } from '@common/statucCodeEnum';
import { CustomError } from './CustomError';

export class CorsError extends CustomError<CorsError> {
  constructor(message: string, title: string = 'Cors Error') {
    super(message, StatusCode.REJECTED_URL, title);
  }
}
