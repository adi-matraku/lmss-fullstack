import {Component, OnDestroy} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {BooksStore} from "../../services/books.store";
import {MessageService} from "primeng/api";
import {catchError, map, Observable, of, pluck, Subscription, switchMap, tap} from "rxjs";
import {BookResponse} from "../../model/book-response.model";
import {BookEditModel} from "../../model/book-edit.model";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnDestroy {

  isLoading: boolean = false;
  disabled: boolean = true;

  subscription: Subscription | null = null;

  resetObject!: {
    id: string,
    isbn: string,
    title: string,
    author: string,
    numberOfCopies: number,
    images: [],
  }

  form = this.fb.group({
    id: [''],
    isbn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    title: ['', [Validators.required, Validators.minLength(4)]],
    author: ['', [Validators.required, Validators.minLength(4)]],
    numberOfCopies: [1, [Validators.required]],
    images: ['']
  })

  book$: Observable<BookResponse | null> = this.route.params.pipe(
    pluck('id'),
    switchMap((id: string) =>
      id ? this.booksService.getBookById(id).pipe(tap((response) => {
            // console.log(response);
            this.form.patchValue({
              id: response.id,
              isbn: response.isbn,
              title: response.title,
              author: response.author,
              numberOfCopies: response.numberOfCopies,
              images: response.images,
            });
            this.resetObject = {
              id: response.id,
              isbn: response.isbn,
              title: response.title,
              author: response.author,
              numberOfCopies: response.numberOfCopies,
              images: response.images,
            }
            this.subscription = this.form.valueChanges.pipe(tap(res => console.log(res)), map(value => {
              // console.log(JSON.stringify(value) === JSON.stringify(this.resetObject))
              this.disabled = JSON.stringify(value) === JSON.stringify(this.resetObject);
            })).subscribe();
            // this.sameObject = JSON.stringify(this.form.value) === JSON.stringify(this.resetObject);
          }), catchError((err) => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'Book not found'})
            this.router.navigateByUrl('/book');
            return of(null);
          })
        )
        : of(null)
    )
  )

  constructor(private fb: UntypedFormBuilder,
              private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router,
              private store: BooksStore,
              private messageService: MessageService) {
  }

  onSave() {
    // console.log(this.form.value);

    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');

    const book: BookEditModel = {
      id: `${id}`,
      ...this.form.value,
    }

    if (id) {
      this.booksService.editBook(id, book).subscribe({
          next: () => {
            this.isLoading = false;
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Edited succesfully'})
            this.store.load({})
            this.router.navigateByUrl('/book').then();
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

  onReset() {
    this.form.patchValue(this.resetObject)
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
