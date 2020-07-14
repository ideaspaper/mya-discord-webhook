import { AppLogger } from './app-logger/AppLogger';
import { DBMessage } from './db-messages/DBMessage';
import { DiscordClient } from './discord-client/DiscordClient'
import { ICronWork } from './cron-work/ICronWork';
import { CronWork } from './cron-work/CronWork';

const appLogger = AppLogger.getInstance();
const message: DBMessage = DBMessage.getInstance();
const client: DiscordClient = DiscordClient.getInstance();

const jobMorning: ICronWork = new CronWork('* * * * * *', () => {
  message.getMessage('morning')
    .then((data) => {
      appLogger.log('info', data.text);
      client.sendMessage(data.text);
    })
    .then(() => {
      jobMorning.getNextWork().start();
      jobMorning.stop();
    })
    .catch(() => {
      appLogger.log('error', 'INDEX_ERROR: cron job failed');
    });
});

const jobLunch: ICronWork = new CronWork('* * * * * *', () => {
  message.getMessage('lunch')
    .then((data) => {
      appLogger.log('info', data.text);
      client.sendMessage(data.text);
    })
    .then(() => {
      jobLunch.getNextWork().start();
      jobLunch.stop();
    })
    .catch(() => {
      appLogger.log('error', 'INDEX_ERROR: cron job failed');
    });
});

const jobFact: ICronWork = new CronWork('* * * * * *', () => {
  message.getMessage('fact')
    .then((data) => {
      appLogger.log('info', data.text);
      client.sendMessage(data.text);
    })
    .then(() => {
      jobFact.getNextWork().start();
      jobFact.stop();
    })
    .catch(() => {
      appLogger.log('error', 'INDEX_ERROR: cron job failed');
    });
});

const jobStandup: ICronWork = new CronWork('* * * * * *', () => {
  message.getMessage('standup')
    .then((data) => {
      appLogger.log('info', data.text);
      client.sendMessage(data.text);
    })
    .then(() => {
      jobStandup.getNextWork().start();
      jobStandup.stop();
    })
    .catch(() => {
      appLogger.log('error', 'INDEX_ERROR: cron job failed');
    });
});

const jobNight: ICronWork = new CronWork('* * * * * *', () => {
  message.getMessage('night')
    .then((data) => {
      appLogger.log('info', data.text);
      client.sendMessage(data.text);
    })
    .then(() => {
      jobNight.getNextWork().start();
      jobNight.stop();
    })
    .catch(() => {
      appLogger.log('error', 'INDEX_ERROR: cron job failed');
    });
});

jobMorning.setNextWork(jobLunch);
jobLunch.setNextWork(jobFact);
jobFact.setNextWork(jobStandup);
jobStandup.setNextWork(jobNight);
jobNight.setNextWork(jobMorning);
jobMorning.start();