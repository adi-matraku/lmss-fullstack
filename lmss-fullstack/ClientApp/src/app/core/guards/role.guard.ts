import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthStore} from "../services/auth.store";
import {intersect} from "../../shared/intersect/intersect.function";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {
  constructor(private authStore: AuthStore, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const role = this.authStore.state.user?.role
    console.log(role);
    console.log(route.data['role']);

    if (route.data['role'].includes(role)) {
      return true;
    }
    this.router.navigateByUrl('/loan').then()
    return false;

    // if(intersection.length > 0) {
    //   // console.log('authorized');
    //   return true;
    // } else {
    //   console.log('not authorized')
    //   this.router.navigateByUrl('/loan')
    //   return false;
    // }
  }

}
