import { CalendarAccess } from "@core/enums/calendar-access.enum";

export interface CalendarPermission {
  userId: string;
  username: string;
  email: string;
  access: CalendarAccess;
}
