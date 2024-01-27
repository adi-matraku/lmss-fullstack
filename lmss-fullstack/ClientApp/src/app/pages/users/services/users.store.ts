import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {UsersService} from "./users.service";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {User} from "../../auth/models/user.model";

export interface UserResponse {
  total: number;
  users: User[]
}

export interface UsersParams {
  orderBy: string | null;
  pageSize: number;
  pageNumber: number;
  id: string | null;
  createdAtFirst: string | null;
  createdAtSecond: string | null;
  email: string | null;
  name: string | null;
  lastName: string | null;
  status: string | null;
  role: string | null;
}

export interface UsersState {
  data: User[],
  params: UsersParams,
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: UsersState = {
  data: [],
  params: {
    orderBy: null,
    pageSize: 10,
    pageNumber: 1,
    id: null,
    createdAtFirst: null,
    createdAtSecond: null,
    email: null,
    name: null,
    lastName: null,
    status: null,
    role: null,
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {

  constructor(private usersService: UsersService) {
    super(initialState);
  }

  get params() {
    return this.get(s => s.params);
  }

  load = this.effect((params$: Observable<Partial<UsersParams>>) => params$
    .pipe(tap(() => this.patchState({ loading: true, loaded: false, error: null })),
      switchMap(params => {
        const currentParams = this.params;
        const newParams = { ...currentParams, ...params };
        return this.usersService.getAll(newParams).pipe(tap((response: UserResponse) =>
            this.patchState(
              {
                loading: false,
                loaded: true,
                data: response.users,
                params: newParams,
                total: Number(response.total)
              })
          ), catchError(error => {
              this.patchState({
                error: error.message, data: [], loaded: false, loading: false,
                params: initialState.params
              });
              return EMPTY;
            }
          )
        );
      })
    ));

}
