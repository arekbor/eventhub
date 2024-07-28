import { Injectable } from "@angular/core";
import { AuthTokens } from "@core/models/auth-tokens.model";
import { CalendarSettings } from "../models/calendar-settings.model";

enum StorageKeys {
  ACCESS_TOKEN = "access-token",
  REFRESH_TOKEN = "refresh-token",
  PRIMARY_COLOR = "primary-color",
  SECONDARY_COLOR = "secondary-color",
  CALENDAR_VIEW = "calendar-view",
}

@Injectable()
export class StorageService {
  public setCalendarSettings(calendarSettings: CalendarSettings): void {
    this.setPrimaryColor(calendarSettings.primaryColor);
    this.setSecondaryColor(calendarSettings.secondaryColor);
    this.setCalendarView(calendarSettings.calendarView);
  }

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

  public setPrimaryColor(color: string): void {
    window.localStorage.setItem(StorageKeys.PRIMARY_COLOR, color);
  }

  public getPrimaryColor(): string | null {
    return window.localStorage.getItem(StorageKeys.PRIMARY_COLOR);
  }

  public setSecondaryColor(color: string): void {
    window.localStorage.setItem(StorageKeys.SECONDARY_COLOR, color);
  }

  public getSecondaryColor(): string | null {
    return window.localStorage.getItem(StorageKeys.SECONDARY_COLOR);
  }

  public setCalendarView(calendarView: string): void {
    window.localStorage.setItem(StorageKeys.CALENDAR_VIEW, calendarView);
  }

  public getCalendarView(): string | null {
    return window.localStorage.getItem(StorageKeys.CALENDAR_VIEW);
  }
}
