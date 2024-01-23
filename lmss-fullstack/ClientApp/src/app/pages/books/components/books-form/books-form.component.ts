import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {BooksParams} from "../../services/books.store";

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent implements OnInit {

  @Output() searchQuery = new EventEmitter<{}>();

  constructor(private fb: UntypedFormBuilder) { }

  availability = [
    { label: '--', value: null },
    { label: 'Available', value: 'available' },
    { label: 'Unavailable', value: 'unavailable' }
  ];

  ngOnInit(): void {
  }

  @Input() set formValue(params: BooksParams) {
    this.form.patchValue({
      isbn: params.isbn,
      title: params.title,
      author: params.author,
      status: params.status,
    })
  }

  form = this.fb.group({
    isbn: null,
    title: null,
    author: null,
    status: null,
  })

  onSearch() {
    console.log(this.form.value)
    this.searchQuery.emit(this.form.value)
  }

  reset() {
    this.searchQuery.emit({
      offset: 0,
      isbn: null,
      title: null,
      status: null,
      author: null,
    })
  }

}
