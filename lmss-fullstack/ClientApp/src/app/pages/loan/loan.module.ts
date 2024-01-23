import {NgModule} from "@angular/core";
import {LoanComponent} from './containers/loan/loan.component';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {NewLoanComponent} from "./containers/new-loan/new-loan.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoansFormComponent} from './components/loans-form/loans-form.component';
import {LoansTableComponent} from './components/loans-table/loans-table.component';
import {ViewLoanComponent} from './containers/view-loan/view-loan.component';
import {EditLoanComponent} from './containers/edit-loan/edit-loan.component';
import {ImportLoanComponent} from './containers/import-loan/import-loan.component';
import {SharedModule} from "../../shared/shared.module";
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from "primeng/dropdown";
import {LoansStore} from "./services/loans.store";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {CommonModule} from "@angular/common";
import {DirectiveModule} from "../../directive/directive.module";
import {RippleModule} from "primeng/ripple";

const routes: Routes = [
  {
    path: '',
    component: LoanComponent,
  },
  {
    path: 'new',
    component: NewLoanComponent,
  },
  {
    path: ':id',
    component: ViewLoanComponent,
  },
  {
    path: ':id/edit',
    component: EditLoanComponent,
  },
  {
    path: 'import',
    component: ImportLoanComponent,
  }
];

@NgModule({
  imports: [
    // LayoutModule,
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    SharedModule,
    DirectiveModule,
    RippleModule,
  ],
  declarations: [
    LoanComponent,
    NewLoanComponent,
    LoansFormComponent,
    LoansTableComponent,
    ViewLoanComponent,
    EditLoanComponent,
    ImportLoanComponent
  ],
  providers: [
    LoansStore
  ]
})
export class LoanModule {

}
