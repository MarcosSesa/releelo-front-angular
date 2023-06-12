import {Injectable} from '@angular/core';
import {Repository} from "../utils/repository";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

/**
 * AuthRepository
 */
@Injectable({
  providedIn: 'root'
})
export class AutenticadorRepository extends Repository {
  constructor(http: HttpClient) {
    super(http, `${environment.services.url}/autenticador/api`);
  }
}
