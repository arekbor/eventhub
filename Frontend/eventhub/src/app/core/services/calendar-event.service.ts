import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CalendarEventBody } from "@core/models/calendar-event-body.model";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class CalendarEventService {
  constructor(private httpClient: HttpClient) {}

  public createCalendarEvent(
    calendarEventBody: CalendarEventBody
  ): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.apiUrl}/CalendarEvents/create`,
      calendarEventBody
    );
  }
}
