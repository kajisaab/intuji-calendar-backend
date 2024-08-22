/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Note : Our custom error extends from Error, so we can throw this error as an exception,
export class CustomError<T> extends Error {
  status: number;
  code: string;
  errorTitle?: string;
  data: {
    message: string;
  };

  constructor(
    message: string = 'Error',
    status: number = 400,
    errorTitle: string = '',
    code: string = '-1'
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.errorTitle = errorTitle;
    this.data = {
      message
    };
  }
}

export interface IResponseError {
  status?: number;
  code: string;
  errorTitle?: string;
  message: string;
  data: {
    message: string;
  };
}
