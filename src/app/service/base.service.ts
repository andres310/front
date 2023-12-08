import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');
  }

  get<T>(
    baseUrl: string,
    requestUrl: string,
    httpParams: any = {}
  ): Observable<any> {
    return this.httpClient.get<T>(baseUrl + requestUrl, {
      headers: this.headers,
      params: httpParams,
    });
  }

  post<T>(
    baseUrl: string,
    requestUrl: string,
    bodyRequest: any,
    httpParams: any = {}
  ): Observable<any> {
    return this.httpClient.post<T>(baseUrl + requestUrl, bodyRequest, {
      headers: this.headers,
      params: httpParams,
    });
  }

  put<T>(
    baseUrl: string,
    requestUrl: string,
    bodyRequest: any
  ): Observable<any> {
    return this.httpClient.put(baseUrl + requestUrl, bodyRequest, {
      headers: this.headers,
    });
  }

  delete<T>(baseUrl: string, requestUrl: string): Observable<any> {
    return this.httpClient.delete(baseUrl + requestUrl, {
      headers: this.headers,
    });
  }

}
