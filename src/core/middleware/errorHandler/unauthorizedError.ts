import { StatusCode } from '@common/statucCodeEnum';
import { CustomError } from './CustomError';
export class UnauthorizedError extends CustomError<UnauthorizedError> {
  constructor(message: string) {
    super(message, StatusCode.UNAUTHORIZED, 'Unauthorized');
  }
}
