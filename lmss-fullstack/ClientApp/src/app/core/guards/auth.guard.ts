import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthStore} from "../services/auth.store";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor(private authStore: AuthStore, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    const user = this.authStore.state.user;

    if (user) {
      // console.log(user);
      console.log('auth');
      return true;
    } else {
      // console.log(user);
      this.router.navigate(['/auth/signin']);
      return false;
    }
  }
}
