import {Injectable} from '@angular/core';
import {Book} from "../model/book.model";
import {ComponentStore} from "@ngrx/component-store";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {BookResponse} from "../model/book-response.model";
import {BooksService} from "./books.service";

export interface BooksParams {
  orderBy: string | null;
  pageSize: number;
  pageNumber: number;
  isbn: string | null;
  title: string | null;
  status: string | null;
  author: string | null;
}

export interface BooksState {
  data: Book[],
  params: BooksParams,
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: BooksState = {
  data: [],
  params: {
    orderBy: null,
    pageSize: 10,
    pageNumber: 1,
    isbn: null,
    title: null,
    status: null,
    author: null,
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}

@Injectable()
export class BooksStore extends ComponentStore<BooksState> {

  constructor(private booksService: BooksService) {
    super(initialState);
    this.state$.subscribe(console.log)
  }

  get params() {
    return this.get(s => s.params);
  }

  load = this.effect((params$: Observable<Partial<BooksParams>>) => params$
    .pipe(tap(() => this.patchState({loading: true, loaded: false, error: null})),
      switchMap(params => {
        const currentParams = this.params;
        const newParams = {...currentParams, ...params};
        return this.booksService.getAll(newParams).pipe(tap((response: BookResponse) =>
            this.patchState(
              {
                loading: false,
                loaded: true,
                data: response.books,
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


  //  this.store.load({})

}
