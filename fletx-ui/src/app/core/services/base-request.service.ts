import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseRequestService {
  constructor(protected http: HttpClient) {}

  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  protected post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data);
  }

  protected put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data);
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
