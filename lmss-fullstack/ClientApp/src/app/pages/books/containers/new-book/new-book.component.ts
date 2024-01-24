import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book.model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {BooksStore} from "../../services/books.store";

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  books: Book[] = [];

  constructor(private fb: UntypedFormBuilder, private bookService: BooksService, private router: Router,
              private messageService: MessageService, private store: BooksStore) {
  }

  ngOnInit(): void {
  }

  form = this.fb.group({
    isbn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    title: ['', [Validators.required, Validators.minLength(4)]],
    author: ['', [Validators.required, Validators.minLength(4)]],
    numberOfCopies: [1, [Validators.required]]
  })

  onSave() {
    console.log(this.form);
    console.log(this.form.value);

    const newData = this.form.value;

    const data: Book = {
      isbn: newData.isbn,
      title: newData.title,
      author: newData.author,
      numberOfCopies: newData.numberOfCopies,
    }

    this.bookService.postBook(data).subscribe({
        next: () => {
          this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Created succesfully'})
          this.store.load({})
          this.router.navigateByUrl('/book');
        },
        error: (err) => {
          this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
          this.store.load({})
          console.log(err);
        }
      }
    )

  }

  reset() {
    this.form.setValue({
      isbn: '',
      title: '',
      author: '',
      numberOfCopies: 1
    })
  }

}
