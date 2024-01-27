import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {LoansParams} from "./loans.store";
import {BookResponse} from "../../books/model/book-response.model";
import {LoanBookResponse, LoanModel} from "../model/loan-book-response.model";
import {EditLoanBook} from "../model/edit-loan-book.model";
import {LoanData} from "../model/post-loan-model";

@Injectable({
  providedIn: 'root',
})
export class LoansService {

  constructor(private http: HttpClient) {
  }

  getBooks(query: string): Observable<any> {
    let path = `${environment.apiUrl}/api/book/autocomplete?limit=10`;
    if (query) {
      path += `&query=${query}`
    }
    return this.http.get(path);
  }

  getMember(query: string): Observable<any> {
    let path = `${environment.apiUrl}/api/users/autocomplete?limit=10`;
    if (query) {
      path += `&query=${query}`
    }
    return this.http.get(path);
  }

  getLoanBookById(id: string): Observable<any> {
    return this.http.get<BookResponse>(`${environment.apiUrl}/api/loans/${id}`);
  }

  getAll(params: LoansParams) {
    return this.http.get<any>(`${environment.apiUrl}/api/loans`, {params: this.getLoanParams(params)})
  }

  getLoanParams(params: LoansParams) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageSize', params.pageSize)
    httpParams = httpParams.set('pageNumber', params.pageNumber)

    if (params.bookID) {
      httpParams = httpParams.set('bookID', params.bookID)
    }

    if (params.userID) {
      httpParams = httpParams.set('userID', params.userID)
    }

    if (params.status) {
      httpParams = httpParams.set('status', params.status)
    }

    // if(params.issueFromDateRange) {
    //   httpParams = httpParams.set('loanDate', params.status)
    // }

    if (params.loanDateStart && params.loanDateEnd) {
      httpParams = httpParams.set('loanDateStart', params.loanDateStart)
        .append('loanDateEnd', params.loanDateEnd)
    }
    //
    if (params.dueFromDateRange && params.dueToDateRange) {
      httpParams = httpParams.set('dueDateStart', params.dueFromDateRange)
        .append('dueDateEnd', params.dueToDateRange)
    }
    //
    if (params.returnFromDateRange && params.returnToDateRange) {
      httpParams = httpParams.set('returnDateStart', params.returnFromDateRange)
        .append('returnDateEnd', params.returnToDateRange)
    }

    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    // console.log(httpParams.toString());
    return httpParams;
  }

  deleteLoans(books: LoanModel[]): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/loans`, {params: this.deleteLoanBookParams(books)})
  }

  deleteLoanBookParams(books: LoanModel[]): HttpParams {
    let httpParams = new HttpParams();
    books.forEach(book => {
      httpParams = httpParams.append('ids', book.id);
    })
    return httpParams;
  }

  singleLoanDeleteBook(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/loans?ids=${id}`)
  }

  editLoanBook(id: string, book: EditLoanBook): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/loans/${id}`, book)
  }

  postLoan(data: LoanData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/loans`, data)
  }

}
