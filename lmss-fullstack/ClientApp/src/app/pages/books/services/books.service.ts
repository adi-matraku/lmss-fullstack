import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable} from "rxjs";
import {Book} from "../model/book.model";
import {BooksParams} from "./books.store";
import {BookResponse} from "../model/book-response.model";
import {BookEditModel} from "../model/book-edit.model";

export interface BookModelServerResponse {
  rows: Book[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<BookResponse>(`${environment.apiUrl}/api/book/${id}`);
  }

  postBook(data: Book): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/book`, {
        data: {...data}
      }
    )
  }

  getBooks(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/book`).pipe(map((res) => {
      return res.rows;
    }))
  }

  getAll(params: BooksParams) {
    return this.http.get<any>(`${environment.apiUrl}/api/book`, {params: this.getBookParams(params)})
  }

  getBookParams(params: BooksParams) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', params.limit)
    httpParams = httpParams.set('offset', params.offset)

    if (params.isbn) {
      httpParams = httpParams.set('filter[isbn]', params.isbn)
    }

    if (params.title) {
      httpParams = httpParams.set('filter[title]', params.title)
    }

    if (params.author) {
      httpParams = httpParams.set('filter[author]', params.author)
    }

    if (params.status) {
      httpParams = httpParams.set('filter[status]', params.status)
    }

    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    // console.log(httpParams.toString());
    return httpParams;
  }

  editBook(id: string, book: BookEditModel): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/book/${id}`, book)
  }

  singleDeleteBook(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/book?ids[]=${id}`)
  }

  deleteBooks(books: BookResponse[]): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/book`, {params: this.deleteBookParams(books)})
  }

  deleteBookParams(books: BookResponse[]): HttpParams {
    let httpParams = new HttpParams();
    books.forEach(book => {
      httpParams = httpParams.append('ids[]', book.id);
    })
    return httpParams;
  }
}
