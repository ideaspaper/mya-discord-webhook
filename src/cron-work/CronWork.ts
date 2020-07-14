import { CronJob, CronCommand } from 'cron';
import { ICronWork } from './ICronWork';

export class CronWork implements ICronWork {
  private nextWork: ICronWork;
  private job: CronJob;

  constructor (cron: string, command: CronCommand) {
    this.job = new CronJob(cron, command);
  }

  public start() {
    this.job.start();
  }

  public stop() {
    this.job.stop();
  }

  public setNextWork(next: ICronWork) {
    this.nextWork = next;
  }

  public getNextWork(): ICronWork {
    return this.nextWork;
  }
}