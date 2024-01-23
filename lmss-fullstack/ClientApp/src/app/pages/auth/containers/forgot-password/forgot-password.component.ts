import {Component} from "@angular/core";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent {
  constructor(private fb: UntypedFormBuilder, private router: Router) {
  }

  form = this.fb.group({
    'email': ['', {
      validators:[
        Validators.required,
        Validators.minLength(6)]
    }]
  });

  onMainRedirect() {
    this.router.navigate(['auth/signin'])
  }

}
