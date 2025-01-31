import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UsersParams} from "./users.store";
import {UserDisable} from "../model/user-disable.model";
import {Observable} from "rxjs";
import {UsersResponse} from "../model/user-response.model";
import {UserEdit} from "../model/user-edit.model";
import {NewUser} from "../model/new-user.model";

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getAll(params: UsersParams) {
    return this.http.get<any>(`${environment.apiUrl}/api/users`, {params: this.getUserParams(params)})
  }

  getUserParams(params: UsersParams) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageSize', params.pageSize)
    httpParams = httpParams.set('pageNumber', params.pageNumber)

    if (params.orderBy) {
      httpParams = httpParams.set('orderBy', params.orderBy);
    }

    if (params.id) {
      httpParams = httpParams.set('id', params.id)
    }

    if (params.email) {
      httpParams = httpParams.set('email', params.email)
    }

    if (params.name) {
      httpParams = httpParams.set('firstName', params.name)
    }

    if (params.lastName) {
      httpParams = httpParams.set('lastName', params.lastName)
    }

    if (params.role) {
      httpParams = httpParams.set('role', params.role)
    }

    if (params.status) {
      httpParams = httpParams.set('isActive', params.status)
    }

    if (params.createdAtFirst && params.createdAtSecond) {
      httpParams = httpParams.set('createdAtRange', params.createdAtFirst)
        .append('createdAtRange', params.createdAtSecond)
    }

    // console.log(httpParams.toString());
    return httpParams;
  }

  userStatusChange(data: UserDisable) {
    return this.http.put(`${environment.apiUrl}/api/users/update-status`, data)
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<UsersResponse>(`${environment.apiUrl}/api/users/${id}`);
  }

  editUser(data: UserEdit): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/api/users`, data)
  }

  postUser(data: NewUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/users/create`, data)
  }

}
