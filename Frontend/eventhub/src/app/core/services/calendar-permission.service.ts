import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CalendarAccess } from "@core/enums/calendar-access.enum";
import { CalendarPermissionBody } from "@core/models/calendar-permission-body.model";
import { CalendarPermission } from "@core/models/calendar-permission.model";
import { PaginatedList } from "@core/models/paginated-list.model";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class CalendarPermissionService {
  constructor(private httpClient: HttpClient) {}

  public getUserCalendarPermissions(
    pageNumber: number,
    pageSize: number
  ): Observable<PaginatedList<CalendarPermission>> {
    let params = new HttpParams();

    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);

    return this.httpClient.get<PaginatedList<CalendarPermission>>(
      `${environment.apiUrl}/CalendarPermissions/list`,
      {
        params: params,
      }
    );
  }

  public add(
    userId: string,
    calendarPermissionBody: CalendarPermissionBody
  ): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.apiUrl}/CalendarPermissions`,
      calendarPermissionBody,
      {
        params: { userId: userId },
      }
    );
  }

  public update(
    userId: string,
    calendarPermissionBody: CalendarPermissionBody
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.apiUrl}/CalendarPermissions`,
      calendarPermissionBody,
      {
        params: { userId: userId },
      }
    );
  }

  public removeUser(userId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/CalendarPermissions`,
      {
        params: { userId: userId },
      }
    );
  }

  public getUserManagerAccess(
    userManagerId: string
  ): Observable<CalendarAccess> {
    return this.httpClient.get<CalendarAccess>(
      `${environment.apiUrl}/CalendarPermissions/access`,
      {
        params: { userManagerId: userManagerId },
      }
    );
  }
}
