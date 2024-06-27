export interface CalendarEventBody {
  title: string;
  allDay: boolean;
  rangeDates: Date[] | null;
}
