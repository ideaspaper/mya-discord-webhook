import { CronJob, CronCommand } from 'cron';
import { ICronWork } from './ICronWork';
import { AppLogger } from '../app-logger/AppLogger';

export class CronWork implements ICronWork {
  private appLogger: AppLogger;
  private nextWork: ICronWork;
  private job: CronJob;

  constructor(cron: string, command: CronCommand, completeCommand: CronCommand) {
    this.job = new CronJob(cron, command, completeCommand);
    this.appLogger = AppLogger.getInstance();
  }

  public start(): void {
    this.appLogger.log('info', `CRON_WORK_INFO: work will be executed on ${this.getNextDate()}`);
    this.job.start();
  }

  public stop(): void {
    this.appLogger.log('info', 'CRON_WORK_INFO: work has been stopped');
    this.job.stop();
  }

  public setNextWork(next: ICronWork): void {
    this.nextWork = next;
  }

  public getNextWork(): ICronWork {
    return this.nextWork;
  }

  public getNextDate(): moment.Moment {
    return this.job.nextDate();
  }
}