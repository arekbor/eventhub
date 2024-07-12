export enum CalendarAccess {
  CanOnlyRead = 0,
  CanReadAndModify = 1,
}

export const CalendarAccessMap = [
  { name: "Can only read", access: CalendarAccess.CanOnlyRead },
  {
    name: "Can read and modify",
    access: CalendarAccess.CanReadAndModify,
  },
];
