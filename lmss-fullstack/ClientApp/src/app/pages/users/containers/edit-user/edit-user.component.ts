import {Component, OnInit} from '@angular/core';
import {catchError, Observable, of, pluck, switchMap, tap} from "rxjs";
import {UsersResponse} from "../../model/user-response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UsersStore} from "../../services/users.store";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  isLoading: boolean = false;

  roles = [
    {label: 'Admin', value: 0},
    {label: 'User', value: 1},
  ];

  form = this.fb.group({
    id: [''],
    email: ['', Validators.email],
    username: ['', Validators.minLength(3)],
    firstName: ['', Validators.minLength(3)],
    lastName: ['', Validators.minLength(3)],
    phoneNumber: [''],
    role: [''],
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
              username: response.username,
              phoneNumber: response.phoneNumber,
              role: response.role,
            });

          }), catchError((err) => {
          console.log(err);
          this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.error})
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
              private messageService: MessageService) {
  }

  ngOnInit(): void {

  }

  onSave() {
    console.log(this.form.value);

    this.isLoading = true;

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.usersService.editUser(this.form.value).subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Edited succesfully'})
            this.store.load({})
            this.router.navigateByUrl('/iam').then();
          },
          error: (err) => {
            this.isLoading = false;
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.error})
            console.log(err);
          }
        }
      )
    }
  }

}
