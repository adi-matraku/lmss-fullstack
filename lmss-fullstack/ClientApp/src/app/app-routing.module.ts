import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {NonAuthGuard} from "./core/guards/non-auth.guard";
import {AuthGuard} from "./core/guards/auth.guard";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/auth/signin', pathMatch: 'full'},
  {
    // non auth guard
    path: 'auth', component: AuthLayoutComponent, children: [
      {
        path: '',
        canActivate: [NonAuthGuard],
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      }
    ]
  },
  {
    //auth guards
    path: '', component: MainLayoutComponent, children: [
      {
        path: 'loan',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/loan/loan.module').then((m) => m.LoanModule),
      },
      {path: '**', redirectTo: 'loan'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
