import { AppLogger } from './app-logger/AppLogger';
import { DBMessage } from './db-messages/DBMessage';
import { DiscordClient } from './discord-client/DiscordClient'
import { ICronWork } from './cron-work/ICronWork';
import { CronWork } from './cron-work/CronWork';
import { standard } from './jobs.json';

const appLogger = AppLogger.getInstance();
const message: DBMessage = DBMessage.getInstance();
const client: DiscordClient = DiscordClient.getInstance();

// Array for storing all standardJob work instance
const standardJobs: ICronWork[] = [];

// Create work instances based on jobs.json, then store them to standardJobs
for (const job of standard) {
  const standardJob: ICronWork = new CronWork(job.cronTime, () => {
    message.getMessage(job.event)
      .then((data) => {
        appLogger.log('info', `INDEX_INFO: ${data.text}`);
        client.sendMessage(data.text);
      })
      .then(() => {
        standardJob.getNextWork().start();
        standardJob.stop();
      })
      .catch(() => {
        appLogger.log('error', 'INDEX_ERROR: cron job failed');
      });
  });

  standardJobs.push(standardJob);
}

// Assign next work instance (i + 1) for each of the work instances.
// Last work instance will get first work instance as the next work.
for (let i = 0; i < standardJobs.length; i++) {
  i !== standardJobs.length - 1
    ? standardJobs[i].setNextWork(standardJobs[i + 1])
    : standardJobs[i].setNextWork(standardJobs[0]);
}

// Start the first work instance.
appLogger.log('info', 'INDEX_INFO: standard jobs started');
standardJobs[0].start();