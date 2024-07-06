import { CalendarEvent } from "angular-calendar";

export interface Event extends CalendarEvent<unknown> {
  description: string | null;
  userId: string;
}
