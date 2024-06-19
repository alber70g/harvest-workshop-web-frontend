import { CarPositionDriverData } from '@/services/data-service';

export type ApiResponse = Started | Stopped | Paused;

export type Started = {
  status: 'started';
  time: number;
  data: CarPositionDriverData[];
};

export type Stopped = {
  status: 'stopped';
};

export type Paused = {
  status: 'paused';
  time: number;
};
