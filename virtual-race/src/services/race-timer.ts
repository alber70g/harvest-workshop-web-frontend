export class RaceTimer {
  private static instance: RaceTimer;
  private startDate: Date | undefined;
  private realTimeStartTime: Date | undefined;
  private pauses: [Date, Date | undefined][] = [];

  private constructor() {
    this.realTimeStartTime = undefined;
    this.startDate = undefined;
  }

  private isPaused(): boolean {
    if (!this.isStarted()) {
      return false;
    }

    if (this.pauses.length === 0) {
      return false;
    }

    return this.pauses[this.pauses.length - 1][1] === undefined;
  }

  private isStarted(): boolean {
    return this.startDate !== undefined && this.realTimeStartTime !== undefined;
  }

  private sumAllPauses(): number {
    return this.pauses.reduce((acc, [start, end]) => {
      if (end) {
        return acc + (end.getTime() - start.getTime());
      } else {
        return acc + new Date().getTime() - start.getTime();
      }
    }, 0);
  }

  get status(): 'started' | 'stopped' | 'paused' {
    if (this.isStarted()) {
      return this.isPaused() ? 'paused' : 'started';
    } else {
      return 'stopped';
    }
  }

  public static getInstance(): RaceTimer {
    if (!RaceTimer.instance) {
      RaceTimer.instance = new RaceTimer();
    }
    return RaceTimer.instance;
  }

  public start(startDate: Date): void {
    if (this.isStarted()) {
      throw new Error('RaceTimer already started, stop first');
    }
    if (this.isPaused()) {
      throw new Error('RaceTimer is paused, resume or stop first');
    }
    this.realTimeStartTime = new Date();
    this.startDate = startDate;
  }

  public pause(): void {
    if (!this.isStarted()) {
      throw new Error('RaceTimer is not started');
    }
    if (this.isPaused()) {
      throw new Error('RaceTimer already paused');
    }
    if (this.startDate && this.realTimeStartTime) {
      this.pauses.push([new Date(), undefined]);
    }
  }

  public resume(): void {
    if (!this.isStarted()) {
      throw new Error('RaceTimer is not started');
    }
    if (!this.isPaused()) {
      throw new Error('RaceTimer is not paused');
    }
    if (this.startDate && this.realTimeStartTime) {
      this.pauses[this.pauses.length - 1][1] = new Date();
    }
  }

  public stop(): void {
    if (!this.isStarted()) {
      throw new Error('RaceTimer is not started');
    }
    this.pauses = [];
    this.realTimeStartTime = undefined;
    this.startDate = undefined;
  }

  public now(): number {
    if (!this.isStarted()) {
      throw new Error('RaceTimer is not started');
    }

    if (this.startDate && this.realTimeStartTime) {
      return (
        this.startDate.getTime() +
        (new Date().getTime() -
          this.realTimeStartTime.getTime() -
          this.sumAllPauses())
      );
    }
    return 0;
  }
}

export const raceTimerInstance = RaceTimer.getInstance();
