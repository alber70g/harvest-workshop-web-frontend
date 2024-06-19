import rawCarData from '../../data/car_data.json';
import rawDrivers from '../../data/drivers.json';
import rawPosition from '../../data/position.json';
import rawInterval from '../../data/intervals.json';

export type DriverData = {
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  headshot_url: string;
  country_code: string;
  session_key: number;
  meeting_key: number;
};

export type PositionData = {
  position: number;
  driver_number: number;
  date: string;
  session_key: number;
  meeting_key: number;
};

export type CarData = {
  driver_number: number;
  rpm: number;
  speed: number;
  n_gear: number;
  throttle: number;
  brake: number;
  drs: number;
  date: string;
  session_key: number;
  meeting_key: number;
};

export type CarPositionDriverData = {
  car: CarData;
  driver: DriverData;
  position: PositionData | undefined;
  interval: IntervalsData | undefined;
};

export type IntervalsData = {
  gap_to_leader: number | null;
  interval: number | null;
  driver_number: number;
  date: string;
  session_key: number;
  meeting_key: number;
};

class CarDataService {
  private static carDataService: CarDataService;
  private carData: CarData[];
  drivers: DriverData[];
  position: PositionData[];
  intervals: IntervalsData[];

  private constructor() {
    // Load data from the file
    this.carData = rawCarData as CarData[];
    this.drivers = rawDrivers as DriverData[];
    this.position = (rawPosition as PositionData[]).sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    this.intervals = (rawInterval as IntervalsData[]).sort((a, b) =>
      b.date.localeCompare(a.date)
    );
  }

  public static getInstance(): CarDataService {
    if (!CarDataService.carDataService) {
      CarDataService.carDataService = new CarDataService();
    }
    return CarDataService.carDataService;
  }

  private getCarData(date: number): CarData[] {
    const targetDate = new Date(date);
    const oneSecondEarlier = new Date(targetDate.getTime() - 1000);

    return (
      this.carData
        .filter((record) => {
          const recordDate = new Date(record.date);
          return recordDate >= oneSecondEarlier && recordDate <= targetDate;
        })
        // filter only one entry per driver_number
        .filter(
          (record, index, self) =>
            self.findIndex((t) => t.driver_number === record.driver_number) ===
            index
        )
    );
  }

  private getDriverData(driverNumber: number): DriverData {
    return this.drivers.find(
      (driver) => driver.driver_number === driverNumber
    ) as DriverData;
  }

  private getPositionData(
    date: number,
    driverNumber: number
  ): CarPositionDriverData['position'] {
    const targetDate = new Date(date);

    const position = this.position.find(
      (pos) =>
        pos.date <= targetDate.toISOString() &&
        pos.driver_number === driverNumber
    );
    return position;
  }

  private getIntervalData(
    date: number,
    driverNumber: number
  ): IntervalsData | undefined {
    const targetDate = new Date(date);

    return this.intervals.find(
      (int) =>
        int.date <= targetDate.toISOString() &&
        int.driver_number === driverNumber
    );
  }

  public getCurrentData(date: number): CarPositionDriverData[] {
    const carData = this.getCarData(date);

    return carData.map((car) => {
      const driver = this.getDriverData(car.driver_number);
      const position = this.getPositionData(date, car.driver_number);
      const interval = this.getIntervalData(date, car.driver_number);

      if (!driver || !position || !car) {
        console.log('Incomplete data', { car, driver, position, interval });
        throw new Error('Incomplete data');
      }

      return {
        car,
        driver,
        position,
        interval,
      };
    });
  }

  public firstRecord(): CarData {
    return this.carData[0];
  }

  public highestDateRecord(): CarData {
    return this.carData[this.carData.length - 1];
  }
}

export const carDataService = CarDataService.getInstance();
