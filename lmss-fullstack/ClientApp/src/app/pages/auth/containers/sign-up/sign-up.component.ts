import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {passwordFunction} from "../../utils/password-function";
import {AuthService} from "../../services/auth.service";
import {AuthStore} from "../../../../core/services/auth.store";
import {MessageService} from "primeng/api";
import {take} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private authService: AuthService,
              private authStore: AuthStore,
              private messageService: MessageService) { }

  form = this.fb.group({
    'email': ['', {
      validators:[
        Validators.required,
        Validators.minLength(6)]
    }],
    'password':[
      '',
      [Validators.required, Validators.minLength(6),
        passwordFunction()
      ]
    ]
  });

  onSignup() {

    this.isLoading = true;

    this.submitted= true;
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.authService.signup(email, password).pipe(take(1)).subscribe({
      next: token => {
        console.log(token);
        this.authStore.setToken(token);
        localStorage.setItem('sign-up-token', token);
        this.isLoading = false;
        this.router.navigateByUrl('/loan');
        this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Registered succesfully'})
      },
      error: err => {
        this.isLoading = false;
        console.log(err);
        this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'Email is taken. Please use another one'})
      }

    })
  }

  onSigninRedirect() {
    this.router.navigate(['auth/signin']);
  }
}
