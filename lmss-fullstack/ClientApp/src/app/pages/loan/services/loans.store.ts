import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {LoansService} from "./loans.service";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {LoanBookResponse, LoanModel} from "../model/loan-book-response.model";

export interface LoansParams {
  orderBy: string | null;
  pageSize: number;
  pageNumber: number;
  userID: string| null;
  bookID: string | null;
  status: string | null;
  loanDateStart: string | null;
  loanDateEnd: string | null;
  dueFromDateRange: string | null;
  dueToDateRange: string | null;
  returnFromDateRange: string | null;
  returnToDateRange: string | null;
}

export interface LoansState {
  data: LoanModel[],
  params: LoansParams,
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: LoansState = {
  data: [],
  params: {
    orderBy: null,
    pageSize: 10,
    pageNumber: 1,
    userID: null,
    bookID: null,
    status: null,
    loanDateStart: null,
    loanDateEnd: null,
    dueFromDateRange: null,
    dueToDateRange: null,
    returnFromDateRange: null,
    returnToDateRange: null,
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}

@Injectable()
export class LoansStore extends ComponentStore<LoansState> {

  constructor(private loansService: LoansService) {
    super(initialState);

    this.state$.subscribe(console.log)
  }

  get params() {
    return this.get(s => s.params);
  }

  load = this.effect((params$: Observable<Partial<LoansParams>>) =>
    params$.pipe(tap(() => this.patchState({ loading: true, loaded: false, error: null })),
      switchMap(params => {
        const currentParams = this.params;
        const newParams = { ...currentParams, ...params };
        return this.loansService.getAll(newParams).pipe(tap((response: LoanBookResponse) =>
            this.patchState(
              {
                loading: false,
                loaded: true,
                data: response.loans,
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
