import { type Logger, createLogger, format, transports } from 'winston';

enum WinstonLogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
  HTTP = 'http',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly'
}

export default class AppLogger {
  logger: Logger;
  constructor() {
    const { combine, timestamp, label, printf } = format;
    const customLoggerFormat = printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    });
    this.logger = createLogger({
      format: combine(label({ label: 'AppLog' }), timestamp(), customLoggerFormat),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: 'AppLogger.log'
        })
      ]
    });
  }

  log(message: any): void {
    this.logger.log(WinstonLogLevel.INFO, message);
  }

  error(message: any): void {
    this.logger.log(WinstonLogLevel.ERROR, message);
  }

  warn(message: any): void {
    this.logger.log(WinstonLogLevel.WARN, message);
  }

  debug?(message: any): void {
    this.logger.log(WinstonLogLevel.DEBUG, message);
  }

  verbose?(message: any): void {
    this.logger.log(WinstonLogLevel.VERBOSE, message);
  }
}
