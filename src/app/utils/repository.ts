import {HttpClient, HttpContext, HttpHeaders, HttpParams,} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class Repository {
  public readonly baseUrl: string;

  constructor(protected http: HttpClient, baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public request<T>(
    method: Uppercase<Exclude<keyof HttpClient, 'request'>>,
    url: string,
    options: {
      body?: any;
      headers?: HttpHeaders | { [header: string]: string | string[] };
      context?: HttpContext;
      observe?: 'body' | 'events' | 'response';
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | readonly (string | number | boolean)[];
          };
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    } = {}
  ): Observable<T> {
    return this.http.request(method, `${this.baseUrl}${url}`, options);
  }
}
