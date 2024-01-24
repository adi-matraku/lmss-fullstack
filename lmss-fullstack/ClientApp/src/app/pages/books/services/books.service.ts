import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable} from "rxjs";
import {Book} from "../model/book.model";
import {BooksParams} from "./books.store";
import {BookModel, BookResponse} from "../model/book-response.model";
import {BookEditModel} from "../model/book-edit.model";

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
    return this.http.post(`${environment.apiUrl}/api/book`, data)
  }

  getAll(params: BooksParams) {
    return this.http.get<any>(`${environment.apiUrl}/api/book`, {params: this.getBookParams(params)})
  }

  getBookParams(params: BooksParams) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageSize', params.pageSize)
    httpParams = httpParams.set('pageNumber', params.pageNumber)

    if (params.isbn) {
      httpParams = httpParams.set('isbn', params.isbn)
    }

    if (params.title) {
      httpParams = httpParams.set('title', params.title)
    }

    if (params.author) {
      httpParams = httpParams.set('author', params.author)
    }

    if (params.status) {
      httpParams = httpParams.set('availabilityStatus', params.status)
    }

    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    return httpParams;
  }

  editBook(id: string, book: BookEditModel): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/api/book/${id}`, book)
  }

  singleDeleteBook(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/book?ids=${id}`)
  }

  deleteBooks(books: BookModel[]): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/book`, {params: this.deleteBookParams(books)})
  }

  deleteBookParams(books: BookModel[]): HttpParams {
    let httpParams = new HttpParams();
    books.forEach(book => {
      httpParams = httpParams.append('ids', book.id);
    })
    return httpParams;
  }
}
