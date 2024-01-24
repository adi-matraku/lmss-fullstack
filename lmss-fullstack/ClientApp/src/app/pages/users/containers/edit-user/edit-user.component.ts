import { Component, OnInit } from '@angular/core';
import {catchError, Observable, of, pluck, switchMap, tap} from "rxjs";
import {LoanBookResponse} from "../../../loan/model/loan-book-response.model";
import {UsersResponse} from "../../model/user-response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UsersStore} from "../../services/users.store";
import {UserEdit} from "../../../edit-profile/models/user-edit.model";
import {UserEditData} from "../../model/user-edit.model";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  isLoading: boolean = false;

  roles = [
    {label: 'Member', value: 'member'},
    {label: 'Librarian', value: 'librarian'},
  ];

  form = this.fb.group({
    id: [''],
    email: [''],
    firstName: [''],
    lastName: [''],
    phoneNumber: [''],
    roles: [''],
  })

  book$: Observable<UsersResponse | null> = this.route.params.pipe(
    pluck('id'),
    switchMap((id: string) =>
      id ? this.usersService.getUserById(id).pipe(tap((response) => {
            // console.log(response.roles[0]);
            this.form.patchValue({
              id: response.id,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              phoneNumber: response.phoneNumber,
              roles: response.roles,
            });

          }), catchError((err) => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'User not found'})
            this.router.navigateByUrl('/iam');
            return of(null);
          })
        )
        : of(null)
    )
  )

  constructor(private route: ActivatedRoute, private router: Router,
              private fb: UntypedFormBuilder,
              private store: UsersStore,
              private usersService: UsersService,
              private messageService: MessageService) { }

  ngOnInit(): void {

  }

  onSave() {
    console.log(this.form.value);

    this.isLoading = true;

    const user: UserEditData = {
      data: this.form.value,
    }

    console.log(user);

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.usersService.editUser(user).subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Edited succesfully'})
            this.store.load({})
            this.router.navigateByUrl('/iam');
          },
          error: (err) => {
            this.isLoading = false;
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
            console.log(err);
          }
        }
      )
    }
  }

}
