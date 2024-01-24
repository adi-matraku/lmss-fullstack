import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {NewUserData} from "../../model/new-user.model";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MessageService} from "primeng/api";
import {UsersStore} from "../../services/users.store";
import {emailValidator} from "../../utils/emailValidator";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  isLoading: boolean = false;

  multipleEmailsDisplay: boolean = true;
  errorMessage: string = ''
  emailArray: string[] = [];

  subscription: Subscription | undefined;

  form = this.fb.group({
    emails: ['', [Validators.required, emailValidator()]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    roles: ['', Validators.required],
  })

  roles = [
    {label: 'Member', value: 'member'},
    {label: 'Librarian', value: 'librarian'},
  ];

  constructor(private fb: UntypedFormBuilder, private usersService: UsersService, private route: ActivatedRoute,
              private messageService: MessageService, private router: Router, private store: UsersStore) { }

  ngOnInit() {
    this.subscription = this.form.get('emails')?.valueChanges.subscribe((value => {
      length = value.length;
      console.log(length);

      if(length > 1) {
        this.multipleEmailsDisplay = false

        this.form.get('firstName')?.setValidators(null);
        this.form.get('lastName')?.setValidators(null);
        this.form.get('phoneNumber')?.setValidators(null);

        this.form.patchValue({
          firstName: null,
          lastName: null,
          phoneNumber: null,
        })

      } else {
        this.multipleEmailsDisplay = true

        this.form.get('firstName')?.setValidators(Validators.required);
        this.form.get('lastName')?.setValidators(Validators.required);
        this.form.get('phoneNumber')?.setValidators(Validators.required);

      }

    }))
  }

  onSave() {
    console.log(this.form.value);
    console.log(this.form.value.emails);

    this.isLoading = true;

    const user: NewUserData = {
      data: this.form.value,
    }

    console.log(user);

    this.usersService.postUser(user).subscribe({
        next: (res) => {
          this.isLoading = false
          this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Created succesfully'})
          this.store.load({})
          this.router.navigateByUrl('/iam');
        },
        error: (err) => {
          this.isLoading = false
          this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'Error! Please use a valid email'})
          console.log(err);
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
