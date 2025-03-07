// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { CarData, carDataService } from '@/services/data-service';
import { raceTimerInstance } from '@/services/race-timer';
import { ApiResponse } from './ApiResponse';

export default function (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (raceTimerInstance.status === 'stopped') {
    res.status(400).json({
      status: raceTimerInstance.status,
    });
    return;
  }

  const responseData = {
    status: raceTimerInstance.status,
    time: raceTimerInstance.now(),
    data: carDataService.getCurrentData(raceTimerInstance.now()),
  };

  if (responseData.data.length !== 0) {
    res.status(200).json(responseData);
  } else {
    raceTimerInstance.stop();
    res.status(200).json({ ...responseData, status: 'stopped' });
  }
}
