import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Register } from "@core/models/register.model";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public register(register: Register): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.apiUrl}/Users/register`,
      register
    );
  }
}
