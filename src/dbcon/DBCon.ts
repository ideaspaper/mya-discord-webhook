import { Database } from 'sqlite3';
import { join } from 'path';
import { dbName } from '../config.json';
import { AppLogger } from '../app-logger/AppLogger';

export class DBCon {
  private static instance: DBCon;
  private appLogger: AppLogger;
  private con: Database;

  private constructor() {
    this.appLogger = AppLogger.getInstance();
    this.open();
  }

  public static getInstance(): DBCon {
    if (!DBCon.instance) {
      DBCon.instance = new DBCon();
    }

    return DBCon.instance;
  }

  public open(): void {
    this.con = new Database(join(__dirname, '..', dbName), (err) => {
      if (err) {
        this.appLogger.log('error', err.message);
      }
    });
  }

  public close(): void {
    this.con.close((err) => {
      if (err) {
        this.appLogger.log('error', err.message);
      }
    });
  }

  public getCon(): Database {
    return this.con;
  }
}
