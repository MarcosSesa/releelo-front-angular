import { SupabaseService } from './../../services/supabase.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public formgroup!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private supabaseservice: SupabaseService,private router: Router,private snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.buildForm();
  }
  onSubmit() {
    this.supabaseservice.signUp(this.formgroup.value.email,this.formgroup.value.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
       }
    })
  }

  private buildForm() {
    this.formgroup = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }
}
