import {Injectable} from '@angular/core';
import {BehaviorSubject, pluck} from "rxjs";
import {User} from "../../pages/auth/models/user.model";

export interface AuthState {
  token: string | null;
  user: User | null
}

export const initialState: AuthState = {
  token: null,
  user: null
}

@Injectable({providedIn: 'root'})
export class AuthStore {

  state$$ = new BehaviorSubject<AuthState>(initialState) // Subject and Observable
  state$ = this.state$$.asObservable(); // Take the subject as an Observable
  user$ = this.state$.pipe(pluck('user'))
  name$ = this.user$.pipe(pluck('firstName'))

  getName(): string {
    return this.state.user?.firstName ?? '';
  }

  constructor() {
  }

  get state(): AuthState {
    return this.state$$.getValue();
  }

  get token(): string | null {
    return this.state$$.getValue().token;
  }

  setToken(token: string | null): void {
    // we set the token to our initial state
    this.state$$.next({...this.state, token});
  }

  setUser(user: User): void {
    // we set the user that we get
    this.state$$.next({...this.state, user})
  }

  setState(state: AuthState): void {
    this.state$$.next({...state});
  }

}
