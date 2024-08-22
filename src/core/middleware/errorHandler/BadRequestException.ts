import { StatusCode } from '@common/statucCodeEnum';
import { CustomError } from './CustomError';
export class BadRequestException extends CustomError<BadRequestException> {
  constructor(message: string, title: string = 'Bad Request') {
    super(message, StatusCode.BAD_REQUEST, title);
  }
}
