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
  public formgroup!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private supabaseservice: SupabaseService) {}

  ngOnInit(): void {
    this.buildForm();
  }
  onSubmit() {
    console.warn(this.formgroup.value);
  }

  private buildForm() {
    this.formgroup = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }
}
