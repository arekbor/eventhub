import { EventColor } from "calendar-utils";

export interface CalendarSettingsBody {
  color: EventColor;
  calendarView: string;
}
