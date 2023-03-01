interface IDateProvider {
  compareInHours: (startDate: Date, endDate: Date) => number;
  convertToUTC: (date: Date) => string;
}

export type { IDateProvider };
