export interface CalendarEventBody {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date | undefined;
}
