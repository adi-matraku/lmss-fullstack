import {Injectable} from '@angular/core';
import {Book} from "../model/book.model";
import {ComponentStore} from "@ngrx/component-store";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {BookResponse} from "../model/book-response.model";
import {BooksService} from "./books.service";

export interface BookServerResponse {
  rows: BookResponse[];
  count: number;
}

export interface BooksParams {
  orderBy: string | null;
  limit: number;
  offset: number;
  isbn: string| null;
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
    limit: 10,
    offset: 0,
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
export class BooksStore extends ComponentStore<BooksState>{

  constructor(private booksService: BooksService) {
    super(initialState);
    this.state$.subscribe(console.log)
  }

  get params() {
    return this.get(s => s.params);
  }

  load = this.effect((params$: Observable<Partial<BooksParams>>) => params$
    .pipe(tap(() => this.patchState({ loading: true, loaded: false, error: null })),
      switchMap(params => {
        const currentParams = this.params;
        const newParams = { ...currentParams, ...params };
        return this.booksService.getAll(newParams).pipe(tap((response: BookServerResponse) =>
            this.patchState(
              {
                loading: false,
                loaded: true,
                data: response.rows,
                params: newParams,
                total: Number(response.count)
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
