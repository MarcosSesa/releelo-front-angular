import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {repeatPasswordValidator} from "../../validators/repeat-password.validator";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isNewUser!: boolean;
  authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.data.subscribe((data) => {
      data['isNewUser'] ? this.#addRegisterControls() : this.isNewUser = data['isNewUser'] ?? false;
    })

  }

  #addRegisterControls() {
    this.authForm.addControl('name', new FormControl('', [Validators.required]))
    this.authForm.addControl('city', new FormControl('', [Validators.required]))
    this.authForm.addControl('age', new FormControl('', [Validators.required]))
    this.authForm.addControl('repeatPassword', new FormControl('', [Validators.required]))
    this.authForm.addValidators(
      repeatPasswordValidator(
        this.authForm.controls['password'],
        this.authForm.controls['repeatPassword']
      )
    );


  }
}
