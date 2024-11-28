// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { raceTimerInstance } from '@/services/race-timer';
import { carDataService } from '@/services/data-service';
import { ApiResponse } from './ApiResponse';

export default function (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    raceTimerInstance.pause();
  } catch (error) {
    res.status(200).json({
      status: 'stopped',
    });
  }
  res.status(200).json({
    status: 'paused',
    time: raceTimerInstance.now(),
  });
}
