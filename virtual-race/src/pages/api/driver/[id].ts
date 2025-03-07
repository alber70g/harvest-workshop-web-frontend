import drivers from '../../../../data/drivers.json';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DriverData } from '@/services/data-service';

export default function (
  req: NextApiRequest,
  res: NextApiResponse<DriverData>
) {
  const driverId = req.query.id;
  if (!driverId || Array.isArray(driverId)) return res.status(404);

  const driver = drivers.find((x) => x.driver_number === parseInt(driverId));

  if (!driver) {
    res.status(404).end();
    return;
  } else {
    res.status(200).json(driver as DriverData);
  }
}
