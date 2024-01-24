import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {NonAuthGuard} from "./core/guards/non-auth.guard";
import {AuthGuard} from "./core/guards/auth.guard";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {RoleGuard} from "./core/guards/role.guard";

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
      {
        path: 'edit-profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/edit-profile/edit-profile.module').then((m) => m.EditProfileModule),
      },
      {
        path: 'iam',
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: ['Admin', 0]
        },
        loadChildren: () =>
          import('./pages/users/users.module').then((m)=> m.UsersModule)
      },
      {
        path: 'book',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/books/books.module').then((m) => m.BooksModule),
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
