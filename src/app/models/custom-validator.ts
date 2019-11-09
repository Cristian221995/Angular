import {ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { UserService } from '../services/user.service';

export class CustomValidator {
  static onlyLetters(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
     const name = /([a-zA-Z])/.test(control.value);
     return name ? {'onlyLetters': {value: control.value}} : null;
    };
  }
  static emailExists(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors> | null => {
      return new Promise((resolve, reject) => {
        userService.checkIfEmailExists(control.value).then((response) => {
          resolve (null);
        }).catch((error) => {
          if (error.status === 409) {
            resolve({'userExist' : true});
          }
        });
      });
    };
  }
}
