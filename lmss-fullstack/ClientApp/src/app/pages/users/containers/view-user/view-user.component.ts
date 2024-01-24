import {Component, OnInit} from '@angular/core';
import {catchError, Observable, of, pluck, switchMap, take, tap} from "rxjs";
import {UsersResponse} from "../../model/user-response.model";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserDisable} from "../../model/user-disable.model";
// import {AuditStore} from "../../../audit-logs/services/audit.store";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  // idValue: string[] = [];

  userId: string = ''
  userEmail: string | undefined = ''
  user$!: Observable<UsersResponse | null> ;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private messageService: MessageService,
              private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit() {
    this.user$ = this.getUser();
  }

  onStatus(status: boolean) {

      const userData: UserDisable = {
        ids: [this.userId],
        disabled: status,
      }

    this.confirmationService.confirm({
      accept: () => {
        this.usersService.userStatusChange(userData).pipe(take(1)).subscribe({
          next: (res) => {
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Done succesfully'})
            this.user$ = this.getUser();
          },
          error: err => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
            console.log(err);
          }
        })
      }
    })
  }

  getUser(): Observable<UsersResponse | null> {
    return this.route.params.pipe(
      pluck('id'),
      tap((id: string) => this.userId = id),
      switchMap((id) =>
        id
          ? this.usersService.getUserById(id).pipe(
            catchError((err) => {
              this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'User not found'})
              return of(null);
            })
          )
          : of(null)
      )
    );
  }

  onActivity(user: UsersResponse) {

    this.router.navigate(
      ['/audit-logs'],
      { queryParams: { createdByEmail: user.email } }
    );
  }

}
