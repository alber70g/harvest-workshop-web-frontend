// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { raceTimerInstance } from '@/services/race-timer';
import { carDataService } from '@/services/data-service';
import { ApiResponse } from './ApiResponse';

export default function (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  raceTimerInstance.resume();
  res.status(200).json({
    status: 'started',
    time: raceTimerInstance.now(),
  });
}
