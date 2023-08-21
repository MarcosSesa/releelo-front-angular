import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {repeatPasswordValidator} from "../../validators/repeat-password.validator";
import {AuthService} from "../../services/auth.service";
import {iif} from "rxjs";
import {translate} from "@ngneat/transloco";
import {openToast} from "../../utils/toast.utils";
import {LoginResponse} from "../../interfaces/user.interface";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide: boolean = true
  isNewUser!: boolean;
  //Auth form initialization
  authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(private activateRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.activateRoute.data.subscribe((data) => {
      this.isNewUser = data['isNewUser'] ?? false;
    })
    if (this.isNewUser) this.addRegisterControls()
  }

  //AÑADIR A LA PANTALLA DE AJUSTES DE USUARIO
 /* openImageSelector(): void {
    document.getElementById('imageInput')?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      let image: File = input.files[0];
      const lector: FileReader = new FileReader();
      lector.onload = function (evento: ProgressEvent<FileReader>) {
        const urlImage: string = evento.target?.result as string;
        const imgElement = document.getElementById('myImage');
        if (imgElement) {
          imgElement.style.backgroundImage = `url(${urlImage})`;
        }
      };
      lector.readAsDataURL(image);
    }
  }*/


  private addRegisterControls() {
    this.authForm.addControl('name', new FormControl('', [Validators.required]))
    this.authForm.addControl('city', new FormControl('', [Validators.required]))
    this.authForm.addControl('age', new FormControl('', [Validators.required, Validators.min(18), Validators.max(100),]))
    this.authForm.addControl('repeatPassword', new FormControl('', [Validators.required]))
    this.authForm.addValidators(
      repeatPasswordValidator(
        this.authForm.controls['password'],
        this.authForm.controls['repeatPassword']
      )
    );
  }

  handleAuth() {
    if (this.authForm.invalid) return;
    iif(() => this.isNewUser,
        this.authService.register(
          this.authForm.controls['name']?.value ?? '',
          this.authForm.controls['email'].value,
          this.authForm.controls['password']?.value,
          this.authForm.controls['city']?.value,
          this.authForm.controls['age']?.value
        ),
        this.authService.login(
          this.authForm.controls['email'].value,
          this.authForm.controls['password'].value
        )

    ).subscribe({
      next: (res: string | LoginResponse) => {
        if (!this.isNewUser) {
          openToast("Bienvenido", "success")
          this.router.navigate(['/home'])
          return;
        }
        openToast("Te has registrado correctamente, prueba a iniciar sesion" , "success", 4000)
        this.router.navigate(['/auth/login']);


      },
      error: (err) => {
        openToast('Credenciales incorrectas','error')
      }
    })



  }
  protected readonly event = event;
  protected readonly translate = translate;
}
