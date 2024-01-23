import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthStore} from "../services/auth.store";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStore) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authStore.token;

    if(token) {
      let modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(modifiedReq);
    } else {
      return next.handle(req)
    }
  }

}
