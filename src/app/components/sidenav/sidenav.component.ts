import {Component,  OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  collapsed: boolean = false;
  isLoged: boolean = false

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.isloged();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed
  }

  private isloged(): boolean{
    this.authSvc.isLogged.subscribe((res) =>{
      this.isLoged =  res
    })
    return false
  }

  logout(): void{
    this.authSvc.logout()
  }
}
