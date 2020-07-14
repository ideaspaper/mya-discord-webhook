import { DBCon } from '../dbcon/DBCon';
import { Database } from 'sqlite3';
import { AppLogger } from '../app-logger/AppLogger';

export class DBMessage {
  private static instance: DBMessage;
  private appLogger: AppLogger;
  private dbCon: DBCon;
  private con: Database;

  private constructor() {
    this.appLogger = AppLogger.getInstance();
    this.dbCon = DBCon.getInstance();
    this.con = this.dbCon.getCon();
  }

  private getIDs(event: string): Promise<{id: number}[]> {
    return new Promise((resolve, reject) => {
      this.dbCon.open();
      const sql: string = 'SELECT id FROM message WHERE event = $0';
      this.con.all(sql, [event], (err, rows) => {
        this.dbCon.close();
        if (err) {
          this.appLogger.log('error', err.message);
          reject();
        } else {
          resolve(rows);
        }
        return;
      });
    });
  }

  private getRandomIDs(event: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getIDs(event)
        .then((rows) => {
          const randomIndex = Math.floor(Math.random() * rows.length);
          resolve(rows[randomIndex].id);
          return;
        })
        .catch(() => {
          this.appLogger.log('error', 'DB_MESSAGES_ERROR: failed getting random ID');
          reject();
          return;
        });
    });
  }

  public static getInstance(): DBMessage {
    if (!DBMessage.instance) {
      DBMessage.instance = new DBMessage();
    }

    return DBMessage.instance;
  }

  public getMessage(event: string): Promise<{text: string}> {
    return new Promise((resolve, reject) => {
      this.getRandomIDs(event)
        .then((id) => {
          this.dbCon.open();
          const sql: string = `SELECT text FROM message WHERE id = $0`;
          this.con.get(sql, [id], (err, row) => {
            this.dbCon.close();
            if (err) {
              this.appLogger.log('error', err.message);
              reject();
            } else {
              resolve(row);
            }
            return;
          });
        })
        .catch(() => {
          this.appLogger.log('error', 'DB_MESSAGES_ERROR: failed getting message');
          reject();
          return;
        });
    });
  }
}
