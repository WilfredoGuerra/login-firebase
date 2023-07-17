import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private errorService: FirebaseErrorService) {
      this.loginUsuario = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })

     }

  login(){
    const email: string = this.loginUsuario.value.email;
    const password: string = this.loginUsuario.value.password;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then( (user) => {
      if(user.user?.emailVerified){
        this.router.navigate(['/dashboard'])
        return;
      } else {
        this.router.navigate(['/verificar-correo'])
      }
      // this.toastr.success(`El usuario ${email} ha ingresado con exito`, 'Ingreso exitoso!')
    }).catch( (error) => {
      this.loading = false;
      this.toastr.error(this.errorService.firebaseError(error.code), 'Error');
      // this.loginUsuario.reset()
      // console.log(error);

    })

  }

}
