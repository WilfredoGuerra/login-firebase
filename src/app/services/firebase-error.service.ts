import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  firebaseError(code: string){

    switch(code) {
      //CORREO YA EXISTE
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
      return 'El usuario ya existe';

      //PASSWORD DEBIL
      case FirebaseCodeErrorEnum.WeakPassword:
      return 'Contraseña muy debil';

      //EMAIL INVALIDO
      case FirebaseCodeErrorEnum.InvalisEmail:
      return 'Correo invalido';

      //CONTRASENA INCORRECTA
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Password incorrecto'

      //USUARIO NO EXISTE
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'Usuario no registrado'

      default:
      return 'Error desconocido'
    }

  }
}
