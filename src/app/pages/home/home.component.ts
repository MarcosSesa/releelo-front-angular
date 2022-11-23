import { SupabaseService } from './../../services/supabase.service';
import { Ibook } from './../../interfaces/ibook';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  booklist : Ibook[] = [];
  page: number = 0;
  rpp: number = 4; 
  filtertext : string = "";
  constructor( private supabaseservice: SupabaseService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(){
  if (this.filtertext.length == 0) {

    this.supabaseservice.getBooks(this.getFromindex(),this.getToIndex()).subscribe({
      next: (data) => {this.booklist.push(... data);
      },
      error: () => {}
       })
  } else if(this.filtertext.length > 0) {
    this.booklist=[];
    this.page=0;
    this.supabaseservice.getBooksByFilter(this.getFromindex(),this.getToIndex(),this.filtertext).subscribe({
      next: (data) => {
        this.booklist.push(... data);
      },
      error: () => {}
       })
  }
  }

  private getFromindex(){
      return this.page*this.rpp
  }
  private getToIndex(){
    return this.page*this.rpp+this.rpp-1
  }

  onScrollDown() {
    console.log("scrolled down!!");
    this.page++;
    this.getBooks();
  }
  onKey(){
    if (this.filtertext.length==0) {
      this.booklist=[];
      this.page=0;
    }
    this.getBooks();
  }
}
