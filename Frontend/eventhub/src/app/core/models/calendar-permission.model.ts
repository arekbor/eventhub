import { CalendarAccess } from "@core/enums/calendar-access.enum";

export interface CalendarPermission {
  id: string;
  userId: string;
  username: string;
  email: string;
  access: CalendarAccess;
  canModify: boolean;
}
