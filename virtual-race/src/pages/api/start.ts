// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { raceTimerInstance } from '@/services/race-timer';
import { carDataService } from '@/services/data-service';
import { ApiResponse } from './ApiResponse';

export default function (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const startPositionData = '2023-08-27T13:03:39.004000+00:00';
  raceTimerInstance.start(new Date(startPositionData));
  res.status(200).json({
    status: 'started',
    time: raceTimerInstance.now(),
    data: carDataService.getCurrentData(raceTimerInstance.now()),
  });
}
