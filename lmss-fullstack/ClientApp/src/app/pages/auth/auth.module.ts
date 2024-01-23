import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from './containers/sign-in/sign-in.component';
import {SignUpComponent} from './containers/sign-up/sign-up.component';
import {PasswordModule } from 'primeng/password';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from 'primeng/checkbox';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {ForgotPasswordComponent} from "./containers/forgot-password/forgot-password.component";

const routes: Routes = [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      },
      {
        path: 'signin',
        component: SignInComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PasswordModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
  ],
  exports: [RouterModule],
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
  ],
})
export class AuthModule {

}
