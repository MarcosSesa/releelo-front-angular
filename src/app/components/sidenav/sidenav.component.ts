import {Component,  OnInit} from '@angular/core';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  collapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed
  }

  closeSidenav() {
    this.collapsed = false
  }
}
