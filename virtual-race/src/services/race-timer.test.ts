import { RaceTimer } from './race-timer';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('RaceTimer', () => {
  let raceTimer: RaceTimer;

  beforeEach(() => {
    raceTimer = RaceTimer.getInstance();
  });

  afterEach(() => {
    vi.useRealTimers();
    raceTimer.stop();
  });

  it('starts the timer', () => {
    const startDate = new Date('2023-09-15T12:45:02.318000+00:00');
    raceTimer.start(startDate);

    expect(raceTimer.now()).toBeGreaterThan(0);
  });

  it('pauses and resume the timer', () => {
    vi.useFakeTimers();
    const startDate = new Date();
    raceTimer.start(startDate);

    raceTimer.pause();
    const pausedTime = raceTimer.now();

    // Simulate a pause of 1 second
    vi.advanceTimersByTime(1000);

    raceTimer.resume();
    expect(raceTimer.now()).toBe(pausedTime);
  });

  it('stops the timer', () => {
    const startDate = new Date();
    raceTimer.start(startDate);

    raceTimer.stop();

    expect(() => raceTimer.now()).toThrowError('RaceTimer is not started');

    raceTimer.start(new Date());
  });

  it('gives the current time', () => {
    vi.useFakeTimers();
    const startDate = new Date();
    raceTimer.start(startDate);

    expect(raceTimer.now()).toBe(startDate.getTime());
    vi.advanceTimersByTime(1000);
    expect(raceTimer.now()).toBeGreaterThan(startDate.getTime());
  });
});
