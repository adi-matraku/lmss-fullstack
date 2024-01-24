import {AbstractControl, ValidationErrors} from "@angular/forms";

export function emailValidator() {
  return (control:AbstractControl): ValidationErrors | null => {

    let value: string[] = control.value;

    if(!value) {
      return null;
    }

    if(typeof value === 'object' ) {
      const validation = value.every((val) =>
      validate(val))
      console.log(validation);
      return !validation ? {isEmail:true}: null
    }

    return null;

  }

}

export function validate(emails: string) {
    return String(emails)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

}
