import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthStore} from "../services/auth.store";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard {
  constructor(private authStore: AuthStore, private router: Router) {
  }

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    const user = this.authStore.state.user;

    if (!user) {
      return true;
    } else {
      console.log(user);
      this.router.navigate(['/loan']);
      return false;
    }
  }

}
