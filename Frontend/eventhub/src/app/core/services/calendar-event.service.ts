import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CalendarEventBody } from "@core/models/calendar-event-body.model";
import { environment } from "@src/environments/environment";
import { CalendarEvent } from "angular-calendar";
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

  public getCalendarEvents(
    start: Date,
    end: Date
  ): Observable<CalendarEvent<string>[]> {
    let params = new HttpParams();

    params = params.append("start", start.toUTCString());
    params = params.append("end", end.toUTCString());

    return this.httpClient.get<CalendarEvent<string>[]>(
      `${environment.apiUrl}/CalendarEvents/list`,
      {
        params: params,
      }
    );
  }
}
