import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import { UsersComponent } from './containers/users/users.component';
import { EditUserComponent } from './containers/edit-user/edit-user.component';
import { ImportUserComponent } from './containers/import-user/import-user.component';
import { ViewUserComponent } from './containers/view-user/view-user.component';
import { NewUserComponent } from './containers/new-user/new-user.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import {RouterModule, Routes} from "@angular/router";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {UsersStore} from "./services/users.store";
import {InputMaskModule} from "primeng/inputmask";
import {MultiSelectModule} from 'primeng/multiselect';
import {ChipsModule} from 'primeng/chips';
// import {AuditStore} from "../audit-logs/services/audit.store";
import {RippleModule} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'new',
    component: NewUserComponent
  },
  // {
  //   path: 'import',
  //   component: ImportUserComponent
  // },
  {
    path: ':id',
    component: ViewUserComponent
  },
  {
    path: ':id/edit',
    component: EditUserComponent
  }
]


@NgModule({
  declarations: [
    UsersComponent,
    EditUserComponent,
    ImportUserComponent,
    ViewUserComponent,
    NewUserComponent,
    UsersFormComponent,
    UsersTableComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    TableModule,
    FormsModule,
    PaginatorModule,
    CalendarModule,
    DropdownModule,
    InputMaskModule,
    MultiSelectModule,
    ChipsModule,
    RippleModule,
    TooltipModule,
  ],
  providers: [
    UsersStore,
    // AuditStore
  ]
})
export class UsersModule { }
