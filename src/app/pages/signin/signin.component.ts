import { SupabaseService } from './../../services/supabase.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public formgroup!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private supabaseservice: SupabaseService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  onSubmit() {
    this.supabaseservice.signIn(this.formgroup.value.email,this.formgroup.value.password).subscribe({
      next: () => {
        console.log(this.formgroup.value.email+"   "+this.formgroup.value.password);
        
        this.router.navigateByUrl('/');
       },
    
    })
  }
  private buildForm() {
    this.formgroup = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

}
