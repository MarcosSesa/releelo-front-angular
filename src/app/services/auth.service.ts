import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {LoginResponse, UserInterface} from "../interfaces/user.interface";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  #isLogged = new BehaviorSubject<boolean>(Boolean(this.token))
  isLogged = this.#isLogged.asObservable()

  #user = new BehaviorSubject<UserInterface | null>(null)
  user = this.#user.asObservable()

  get token() {
    return localStorage.getItem('token') ?? ''
  }

  private setToken(value: string | null) {
    if (!value) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', value);
    }
  }

  logout() {
    this.setToken(null);
    this.#isLogged.next(false);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.services.url}/auth/login`, {
      email,
      password
    }).pipe(
      tap((res: LoginResponse) => {
          this.setToken(res.token.token)
          this.#user.next(res.user)
          this.#isLogged.next(true)
      })
    );
  }

  register(name: string, email: string, password: string, ciudad: string, edad: number): Observable<string> {
    return this.http.post<string>(
      `${environment.services.url}/auth/register`,
      {
        username: name,
        email: email,
        password: password,
        city: ciudad,
        age: edad,
      }
    )
  }

}
