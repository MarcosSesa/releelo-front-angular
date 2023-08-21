import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  collapsed: boolean = false;
  isLoged: boolean = false
  user!: UserInterface | null;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.isloged();
    this.getUSer()
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

  private getUSer(): UserInterface | null{
    this.authSvc.user.subscribe((res) =>{
      this.user =  res
    })
    return null
  }

  logout(): void{
    this.authSvc.logout()
  }
}
