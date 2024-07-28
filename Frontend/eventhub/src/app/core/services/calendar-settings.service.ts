import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CalendarSettingsBody } from "@core/models/calendar-settings-body.model";
import { CalendarSettings } from "@core/models/calendar-settings.model";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class CalendarSettingsService {
  constructor(private httpClient: HttpClient) {}

  public getCalendarSettings(): Observable<CalendarSettings> {
    return this.httpClient.get<CalendarSettings>(
      `${environment.apiUrl}/CalendarSettings`
    );
  }

  public updateCalendarSettings(
    calendarSettingsBody: CalendarSettingsBody
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.apiUrl}/CalendarSettings`,
      calendarSettingsBody
    );
  }
}
