import { SupabaseService } from './../../services/supabase.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private supabaseservice: SupabaseService) {}

  ngOnInit(): void {
    this.buildForm();
  }
  
  signUp(){
    console.log();
  }
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      email: '',
      password: '',
    });
  }
}
