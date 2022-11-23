import { Injectable } from '@angular/core';
import { createClient } from "@supabase/supabase-js";
import { from, map, Observable } from 'rxjs';
import { Ibook } from '../interfaces/ibook';


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
    return from(this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    }))
  }
  signOut(){
    return from(this.supabase.auth.signOut())
  }
  getSession() {
    return from(this.supabase.auth.getSession())
  }
  getBooksByFilter(fromindex: number, toindex: number, filtertext: string): Observable<Ibook[]> {
    console.log(filtertext + "," + fromindex + "," + toindex);
    
    return from(this.supabase.from('Libro').select('*').ilike('titulo', `%${filtertext}%`).range(fromindex,toindex)).pipe(map( (res) => res.data as Ibook[])) 
  }
  getBooks(fromindex: number, toindex: number): Observable<Ibook[]> {
    return from(this.supabase.from('Libro').select('*').range(fromindex,toindex)).pipe(map( (res) => res.data as Ibook[]))
  }
}
