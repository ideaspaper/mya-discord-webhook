import { AppLogger } from './app-logger/AppLogger';
import { ICronWork } from './cron-work/ICronWork';
import { standard } from './jobs.json';
import { StandardCronWork } from './cron-work/StandardCronWork';

const appLogger: AppLogger = AppLogger.getInstance();
appLogger.log('info', 'INDEX_INFO: app started');

const standardJobs: ICronWork = new StandardCronWork(standard);
standardJobs.start();
