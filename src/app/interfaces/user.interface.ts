import {TokenInterface} from "./token-interface";

export interface UserInterface {
  age: number,
  city: string,
  created_at: string,
  email: string,
  id: number,
  updated_at: string,
  username: string
}

export interface LoginResponse {
  token: TokenInterface
  user: UserInterface
}
