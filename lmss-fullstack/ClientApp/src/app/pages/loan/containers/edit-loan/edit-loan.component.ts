import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, Observable, of, pluck, Subscription, switchMap, tap} from "rxjs";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {LoansService} from "../../services/loans.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {LoanBookResponse} from "../../model/loan-book-response.model";
import {formatDate} from "@angular/common";
import {LoansStore} from "../../services/loans.store";
import {formatDates} from "../../utils/formatDates.function";

@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.scss']
})
export class EditLoanComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;

  editObject!: {
    book: string,
    member: string,
    issueDate: string,
    dueDate: string,
    returnDate: string | null,
    status: string,
  }

  subscription: Subscription | null = null;
  disabled = true;

  form = this.fb.group({
    id: [''],
    book: [''],
    member: [''],
    issueDate: [''],
    dueDate: [''],
    returnDate: ['', [Validators.required]],
    status: ['']
  })

  book$: Observable<LoanBookResponse | null> = this.route.params.pipe(
    pluck('id'),
    switchMap((id: string) =>
      id ?
        this.loansService.getLoanBookById(id).pipe(tap((response) => {
            // console.log(response);
            this.form.patchValue({
              id: response.id,
              book: response.book.title,
              member: response.member.email,
              issueDate: this.formatNormalDates(response.issueDate),
              dueDate: this.formatNormalDates(response.dueDate),
              status: response.status,
            });

            this.editObject = {
              book: response.book.id,
              member: response.member.id,
              issueDate: response.issueDate,
              dueDate: response.dueDate,
              returnDate: '',
              status: response.status,
            }

            this.subscription = this.form.valueChanges.pipe(tap(() => {
              this.form.patchValue({
                status: 'Closed'
              })
            })).subscribe();

          }), catchError((err) => {
            console.error(err);
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'Book not found'})
            this.router.navigateByUrl('/loan');
            return of(null);
          })
        )
        : of(null)
    )
  )

  constructor(private fb: UntypedFormBuilder, private loansService: LoansService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private store: LoansStore) { }

  ngOnInit(): void {
    console.log(this.route.params);
  }

  get statusValue() {
    return this.form.get('status')?.value;
  }

  onSave() {
    const returnDate = formatDates(this.form.value.returnDate);

    this.editObject.status = this.form.value.status;
    this.editObject.returnDate = returnDate;

    const id = this.route.snapshot.paramMap.get('id');

    this.isLoading = true;

    const book = {
      id: `${id}`,
      data: this.editObject,
    }

    if (id) {
      this.loansService.editLoanBook(id, book).subscribe({
          next: (res) => {
            console.log(res);
            console.log(this.editObject);
            this.isLoading = false
            this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Edited succesfully'})
            this.store.load({})
            this.router.navigateByUrl('/loan');
          },
          error: (err) => {
            this.isLoading = false
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
            console.log(err);
          }
        }
      )
    }
  }

  formatNormalDates(date: string) {
    let dateFormatted = null;
    if (date) {
      dateFormatted = formatDate(date, 'yyyy-MM-dd hh:mm:ss', 'en_US')
    }
    return dateFormatted;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
