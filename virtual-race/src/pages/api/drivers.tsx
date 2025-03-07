import drivers from '../../../data/drivers.json';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DriverData } from '@/services/data-service';

export default function (
  req: NextApiRequest,
  res: NextApiResponse<DriverData[]>
) {
  try {
    res.status(200).json(drivers as DriverData[]);
  } catch {
    res.status(500).end();
  }
}
