export class Logger {
  private static instance: Logger;
  private context: string;

  private constructor(context: string = 'Application') {
    this.context = context;
  }

  public static getInstance(context?: string): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(context);
    }
    if (context) {
      Logger.instance.context = context;
    }
    return Logger.instance;
  }

  public log(message: string, data?: any): void {
    console.log(`[${this.context}] ${new Date().toISOString()} - INFO: ${message}`);
    if (data) {
      console.log(data);
    }
  }

  public error(message: string, error?: any): void {
    console.error(`[${this.context}] ${new Date().toISOString()} - ERROR: ${message}`);
    if (error) {
      console.error(error);
    }
  }

  public warn(message: string, data?: any): void {
    console.warn(`[${this.context}] ${new Date().toISOString()} - WARN: ${message}`);
    if (data) {
      console.warn(data);
    }
  }

  public debug(message: string, data?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[${this.context}] ${new Date().toISOString()} - DEBUG: ${message}`);
      if (data) {
        console.debug(data);
      }
    }
  }
}
