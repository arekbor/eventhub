import { CalendarAccess } from "@core/enums/calendar-access.enum";

export interface UserCalendarPermission {
  id: string;
  userId: string;
  username: string;
  email: string;
  access: CalendarAccess;
}
