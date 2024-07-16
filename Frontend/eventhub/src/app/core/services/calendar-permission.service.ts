import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CalendarPermissionBody } from "@core/models/calendar-permission-body.model";
import { CalendarPermission } from "@core/models/calendar-permission.model";
import { PaginatedList } from "@core/models/paginated-list.model";
import { UserManagerCalendarPermissionResult } from "@core/models/user-manager-calendar-permission-result.model";
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

  public getUserManagerCalendarPermission(
    userManagerId: string
  ): Observable<UserManagerCalendarPermissionResult> {
    return this.httpClient.get<UserManagerCalendarPermissionResult>(
      `${environment.apiUrl}/CalendarPermissions`,
      {
        params: { userManagerId: userManagerId },
      }
    );
  }
}
