import { AppLogger } from '../app-logger/AppLogger';
import { CronTime, CronJob } from 'cron';
import { DBMessage } from '../db-messages/DBMessage';
import { DiscordClient } from '../discord-client/DiscordClient';
import { ICronWork } from './ICronWork';

export class StandardCronWork implements ICronWork {
  private appLogger: AppLogger;
  private message: DBMessage;
  private workList: { event: string, cronTime: string }[];
  private workIndex: number;
  private job: CronJob;
  private client: DiscordClient;
  private stopFlag: boolean;

  constructor(jobs: { event: string, cronTime: string }[]) {
    this.appLogger = AppLogger.getInstance();
    this.message = DBMessage.getInstance();
    this.client = DiscordClient.getInstance();
    this.workList = jobs;
  }

  private sortWorkList(): void {
    // Sort the work list according to execution date
    const now = new Date();
    this.workList.sort((a, b) => {
      const aCron = new CronTime(`${a.cronTime} * * 1-5`).sendAt().toDate().valueOf();
      const bCron = new CronTime(`${b.cronTime} * * 1-5`).sendAt().toDate().valueOf();
      return (aCron - now.valueOf() > bCron - now.valueOf())
        ? 1
        : -1;
    });
  }

  private setJob(details: { event: string, cronTime: string }): void {
    this.job = new CronJob(`${details.cronTime} * * 1-5`, () => {
      this.message.getMessage(details.event)
        .then((data) => {
          this.client.sendMessage(data.text, details.event);
          this.appLogger.log('info', `STANDARD_CRON_WORK_INFO: ${details.event} message has been sent`);
        })
        .then(() => {
          this.workIndex === this.workList.length - 1
            ? this.workIndex = 0
            : this.workIndex++;
          this.job.stop();
        })
        .catch(() => {
          this.appLogger.log('error', 'STANDARD_CRON_WORK_ERROR: cron job failed');
        });
    },
      () => {
        if (!this.stopFlag) {
          this.setJob(this.workList[this.workIndex]);
        }
      });

    this.job.start()
    this.appLogger.log('info', `STANDARD_CRON_WORK_INFO: ${details.event} scheduled on ${this.job.nextDate()}`);
  }

  public start(): void {
    this.appLogger.log('info', 'STANDARD_CRON_WORK_INFO: started');
    this.stopFlag = false;
    this.sortWorkList();
    this.workIndex = 0;
    this.setJob(this.workList[this.workIndex]);
  }

  public stop(): void {
    this.stopFlag = true;
    this.job.stop();
    this.job = null;
    this.appLogger.log('info', 'STANDARD_CRON_WORK_INFO: stopped');
  }
}