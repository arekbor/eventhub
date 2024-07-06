import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventBody } from "@core/models/event-body.model";
import { Event } from "@core/models/event.model";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class EventService {
  constructor(private httpClient: HttpClient) {}

  public create(body: EventBody): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.apiUrl}/Events/create`,
      body
    );
  }

  public list(start: Date, end: Date): Observable<Event[]> {
    let params = new HttpParams();

    params = params.append("start", start.toUTCString());
    params = params.append("end", end.toUTCString());

    return this.httpClient.get<Event[]>(`${environment.apiUrl}/Events/list`, {
      params: params,
    });
  }
}
