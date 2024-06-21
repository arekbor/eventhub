import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthTokens } from "@core/models/auth-tokens.model";
import { Login } from "@core/models/login.model";
import { Register } from "@core/models/register.model";
import { UserClaims } from "@core/models/user-claims.model";
import { User } from "@core/models/user.model";
import { StorageService } from "@core/services/storage.service";
import { environment } from "@src/environments/environment";
import { Observable, map } from "rxjs";

@Injectable()
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private jwtHelperService: JwtHelperService
  ) {}

  public register(register: Register): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.apiUrl}/Users/register`,
      register
    );
  }

  public login(login: Login): Observable<AuthTokens> {
    return this.httpClient.post<AuthTokens>(
      `${environment.apiUrl}/Users/login`,
      login
    );
  }

  public updateProfile(user: User): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.apiUrl}/Users/updateProfile`,
      user
    );
  }

  public reloadTokens(): Observable<void> {
    const refreshToken = this.storageService.getRefreshToken();

    return this.httpClient
      .post<AuthTokens>(`${environment.apiUrl}/Users/refresh`, {
        token: refreshToken,
      })
      .pipe(
        map((authTokens: AuthTokens) => {
          this.storageService.setAuthTokens(authTokens);
        })
      );
  }

  public isLogged(): boolean {
    return this.getClaims() != null;
  }

  public getClaims(): UserClaims | null {
    const accessToken = this.storageService.getAccessToken();
    return accessToken ? this.jwtHelperService.decodeToken(accessToken) : null;
  }

  public logout(): void {
    this.storageService.removeAuthTokens();
    window.location.reload();
  }

  public getUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/Users/user`);
  }
}
