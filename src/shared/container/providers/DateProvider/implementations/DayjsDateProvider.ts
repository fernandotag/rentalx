import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { type IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    return dayjs(this.convertToUTC(endDate)).diff(
      this.convertToUTC(startDate),
      "hours"
    );
  }

  compareInDays(startDate: Date, endDate: Date): number {
    return dayjs(this.convertToUTC(endDate)).diff(
      this.convertToUTC(startDate),
      "days"
    );
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
}

export { DayjsDateProvider };
