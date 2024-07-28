import { Injectable } from "@angular/core";
import { AuthTokens } from "@core/models/auth-tokens.model";

enum StorageKeys {
  ACCESS_TOKEN = "access-token",
  REFRESH_TOKEN = "refresh-token",
}

@Injectable()
export class StorageService {
  public setAuthTokens(authTokens: AuthTokens): void {
    this.setAccessToken(authTokens.accessToken);
    this.setRefreshToken(authTokens.refreshToken);
  }

  public setAccessToken(accessToken: string): void {
    window.localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);
  }

  public setRefreshToken(refreshToken: string): void {
    window.localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
  }

  public removeAuthTokens(): void {
    window.localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    window.localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  }

  public getAccessToken(): string | null {
    return window.localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  }

  public getRefreshToken(): string | null {
    return window.localStorage.getItem(StorageKeys.REFRESH_TOKEN);
  }
}
