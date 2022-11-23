import { Ibook } from './../../interfaces/ibook';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book !: Ibook;
  constructor() { }

  ngOnInit(): void {
  }
  
}
