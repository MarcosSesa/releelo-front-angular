import { Injectable } from '@angular/core';
import { createClient } from "@supabase/supabase-js";
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabaseUrl = 'https://stfgpujtnwmzjltghsis.supabase.co'
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgwMzQyMywiZXhwIjoxOTU3Mzc5NDIzfQ.Be2xHvLsCGW3W9x_CTRvUoLf6qjvb6J0eAs0ELndNJ8'
  supabase = createClient(this.supabaseUrl, this.supabaseKey)

  constructor() { }

  signUp(email:string, password:string) {
    return from(this.supabase.auth.signUp({
      email: email,
      password: password
    }))
  }

  signIn(email:string, password:string) {
    return from(this.supabase.auth.signUp({
      email: email,
      password: password
    }))
  }
  
}
