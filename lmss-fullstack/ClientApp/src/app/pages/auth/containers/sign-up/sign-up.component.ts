import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UntypedFormBuilder, Validators} from "@angular/forms";
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
              private messageService: MessageService) {
  }

  form = this.fb.group({
    'email': ['', {
      validators: [
        Validators.required,
        Validators.minLength(6)]
    }],
    'firstName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    'lastName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    'password': [
      '',
      [Validators.required, Validators.minLength(6),
        // passwordFunction()
      ]
    ]
  });

  onSignup() {

    this.isLoading = true;

    this.submitted = true;
    if (!this.form.valid) {
      this.isLoading = false;
      return;
    }

    this.authService.signup(this.form.value).pipe(take(1)).subscribe({
      next: token => {
        console.log(token);
        this.authStore.setToken(token);
        localStorage.setItem('sign-up-token', token);
        this.isLoading = false;
        this.router.navigateByUrl('/loan').then();
        this.messageService.add({
          key: 'toast',
          detail: 'Success',
          severity: 'success',
          summary: 'Registered succesfully'
        })
      },
      error: err => {
        this.isLoading = false;
        console.log(err);
        this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.error})
      }

    })
  }

  onSigninRedirect() {
    this.router.navigate(['auth/signin']);
  }
}
