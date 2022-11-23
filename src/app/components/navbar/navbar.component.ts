import { Router } from '@angular/router';
import { SupabaseService } from './../../services/supabase.service';
import { Component, OnInit } from '@angular/core';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  session!: Session | null;
  constructor(
    private supabaseservice: SupabaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getSession();
  }
  private getSession() {
    this.supabaseservice.getSession().subscribe((res) => {
      if (!res.error) {
        this.session = res.data.session;
      }
    });
  }
  signOut() {
    this.supabaseservice.signOut().subscribe((res) => {
      if (!res.error) {
        this.router.navigateByUrl('/');
        this.getSession();
      }
    });
  }

}
