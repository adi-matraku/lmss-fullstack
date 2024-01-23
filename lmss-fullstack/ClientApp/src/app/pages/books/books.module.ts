import {NgModule} from "@angular/core";
import {BooksComponent} from './containers/books/books.component';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {NewBookComponent} from './containers/new-book/new-book.component';
import {ViewBookComponent} from './containers/view-book/view-book.component';
import {EditBookComponent} from './containers/edit-book/edit-book.component';
import {BooksFormComponent} from './components/books-form/books-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputNumberModule} from 'primeng/inputnumber';
import {BooksTableComponent} from './components/books-table/books-table.component';
import {TableModule} from 'primeng/table';
import {BooksStore} from "./services/books.store";
import {PaginatorModule} from 'primeng/paginator';
import {SharedModule} from "../../shared/shared.module";
import {ImportBookComponent} from "./containers/import-book/import-book.component";
import {DirectiveModule} from "../../directive/directive.module";

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'import',
    component: ImportBookComponent,
  },
  {
    path: 'new',
    component: NewBookComponent,
  },
  {
    path: ':id',
    component: ViewBookComponent,
  },
  {
    path: ':id/edit',
    component: EditBookComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    TableModule,
    FormsModule,
    PaginatorModule,
    SharedModule,
    DirectiveModule
  ],
  declarations: [
    BooksComponent,
    NewBookComponent,
    ViewBookComponent,
    EditBookComponent,
    BooksFormComponent,
    BooksTableComponent,
    ImportBookComponent
  ],
  providers: [
    BooksStore
  ]
})
export class BooksModule {

}
