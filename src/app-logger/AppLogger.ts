import { createLogger, Logger, transports } from 'winston';

// { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 }

export class AppLogger {
  private static instance: AppLogger;
  private logger: Logger;
  private errorFile: string;
  private infoFile: string;
  private debugFile: string;


  private constructor() {
    this.errorFile = 'dist/logs/errors.log';
    this.infoFile = 'dist/logs/info.log';
    this.debugFile = 'dist/logs/debug.log';

    this.logger = createLogger({
      transports: [
        new transports.Console(),
        new transports.File({
          filename: this.errorFile,
          level: 'error'
        }),
        new transports.File({
          filename: this.infoFile,
          level: 'info'
        }),
        new transports.File({
          filename: this.debugFile,
          level: 'debug'
        }),
      ]
    });
  }

  public static getInstance(): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger();
    }

    return AppLogger.instance;
  }

  public log(level: string, message: string): void {
    const timeStamp = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    this.logger.log(level, { timeStamp, message });
  }
}