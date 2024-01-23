import { Component } from '@angular/core';
import {take} from "rxjs";
import {AuthStore} from "./core/services/auth.store";
import {AuthService} from "./pages/auth/services/auth.service";
import {User} from "./pages/auth/models/user.model";

@Component({
  selector: 'app-root',
  template: ` <p-confirmDialog
      [breakpoints]="{ '960px': '75vw', '640px': '100vw' }"
      [style]="{ width: '35vw' }"
      message="Are you sure you want to proceed?"
      header="Confirmation"
  >
    </p-confirmDialog>
    <p-toast position="top-right" key="toast"></p-toast>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'library-app';

  constructor(private authStore: AuthStore, private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.setToken(token);
      this.authService
        .me()
        .pipe(take(1))
        .subscribe({
          next: (me: User) => {
            this.authStore.setUser(me);
          },
          error: (err) => {
            console.log(err, 'ERROR');
            this.authStore.setToken(null);
            localStorage.removeItem('token');
          },
        });
    }
  }
}
