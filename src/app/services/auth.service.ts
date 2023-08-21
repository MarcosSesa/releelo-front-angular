import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import {TokenInterface} from "../interfaces/token-interface";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  #isLogged = new BehaviorSubject<boolean>(Boolean(this.token))
  isLogged = this.#isLogged.asObservable()

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

  login(email: string, password: string) {
    return this.http.post<TokenInterface>(`${environment.services.url}/auth/login`, {
      email,
      password
    }).pipe(
      tap((token) => {
        this.setToken(token.token)
        this.#isLogged.next(true)
      })
    );
  }

  logout() {
    this.setToken(null);
    this.#isLogged.next(false);
  }

  register(name: string, email: string, password: string, ciudad: string, edad: number) {
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
