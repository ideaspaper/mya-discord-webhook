export interface ICronWork {
  start(): void;
  stop(): void;
  setNextWork(next: ICronWork): void;
  getNextWork(): ICronWork;
  getNextDate(): moment.Moment;
}