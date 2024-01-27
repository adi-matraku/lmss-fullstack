import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {UsersParams} from "../../services/users.store";
import {formatDates} from "../../../loan/utils/formatDates.function";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  createdAtFirst: string | null = '';
  createdAtSecond: string | null = '';

  status = [
    { label: '--', value: null },
    { label: 'Enabled', value: 'true' },
    { label: 'Disabled', value: 'false' }
  ];

  role = [
    { label: '--', value: null },
    { label: 'Admin', value: '0' },
    { label: 'User', value: '1' }
  ];

  @Input() set formValue(params: UsersParams) {
    this.form.patchValue({
      id: params.id,
      email: params.email,
      name: params.name,
      status: params.status,
      createdAtFirst: params.createdAtFirst,
      createdAtSecond: params.createdAtSecond,
      role: params.role,
    })
  }

  form = this.fb.group({
    id: null,
    createdAt: null,
    email: null,
    name: null,
    lastName: null,
    status: null,
    role: null,
  });

  @Output() searchQuery = new EventEmitter<{}>();

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
  }

  onSearch() {

    if (this.form.value.createdAt) {
      this.createdAtFirst = formatDates(this.form.value.createdAt[0])
      this.createdAtSecond = formatDates(this.form.value.createdAt[1])
    }

    const object = {
      id: this.form.value.id,
      email: this.form.value.email,
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      status: this.form.value.status,
      createdAtFirst: this.createdAtFirst,
      createdAtSecond: this.createdAtSecond,
      role: this.form.value.role,
    }

    console.log(object);
    this.searchQuery.emit(object)
  }

  reset() {
    this.searchQuery.emit({
      offset: 0,
      id: null,
      email: null,
      name: null,
      lastName: null,
      status: null,
      roles: null
    })

    this.form.patchValue({
      createdAt: null,
      lastName: null,
    })
  }

}
