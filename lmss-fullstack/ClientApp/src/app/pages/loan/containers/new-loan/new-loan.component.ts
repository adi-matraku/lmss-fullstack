import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, take} from "rxjs";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {LoansService} from "../../services/loans.service";
import * as dayjs from "dayjs";
import {LoanData, } from "../../model/post-loan-model";
import {MessageService} from "primeng/api";
import {LoansStore} from "../../services/loans.store";
import { Router} from "@angular/router";
import {AutocompleteModel} from "../../model/autocomplete.model";

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.scss']
})
export class NewLoanComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;

  currentDate = new Date();
  inputDate: boolean = false;
  status: string = '';

  books!: AutocompleteModel[];
  members!: AutocompleteModel[];

  subscription: Subscription | undefined;

  constructor(private fb: UntypedFormBuilder,
              private loansService: LoansService,
              private messageService: MessageService,
              private store: LoansStore, private router: Router) {}

  form = this.fb.group({
    book: [null, Validators.required],
    member: [null, Validators.required],
    issueDate: [null, Validators.required],
    dueDate: [null, Validators.required],
    status: null
  });

  ngOnInit() {
    this.subscription = this.form.valueChanges.subscribe(x => {
      this.inputDate = true;

      if(x.issueDate) {
        this.dateFormat(x.issueDate);
      } else {
        this.inputDate = false;

        this.form.patchValue({
          dueDate: null
        }, {emitEvent: false})

      }

    })

  }

  dateFormat(issueDate: Date) {

    let issueDateValue = dayjs(issueDate).format('YYYY-MM-DDTHH:mm:ss');

    let dueDateValue = dayjs(issueDateValue).add(4, 'day').format('YYYY-MM-DDTHH:mm:ss');

    let duePatchedDate = dayjs(dueDateValue).format('MM/DD/YYYY');

    let today = new Date();
    let todayDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');

    let dayDue = dayjs(dueDateValue);
    let dayToday = dayjs(todayDate);

    const difference = dayDue.diff(dayToday)

    if(difference > 0) {
      this.status = 'inProgress'
    } else {
      this.status = 'overdue'
    }

    this.form.patchValue({
      dueDate: duePatchedDate,
      status: this.status,
    }, {emitEvent: false})

  }


  //Book Autocomplete
  search(event: any) {
    console.log(event);

    setTimeout(() => {
      this.loansService.getBooks(event.query).pipe(take(1)).subscribe(res => {
        this.books = res;
        console.log(this.books)
      })
    }, 500)
  }

  select(event: any) {
    console.log(event);
  }

  //////////////////////////////

  // Member Autocomplete
  searchMember(event: any) {
    setTimeout(() => {
      this.loansService.getMember(event.query).pipe(take(1)).subscribe(res => {
        this.members = res;
        console.log(this.members)
      })
    }, 500)
  }

  selectMember(event: any) {
    console.log(event);
  }

  /////////////////////////////

  onSave() {

    let issueDate = this.form.value.issueDate;
    let dueDate = this.form.value.dueDate;

    let formattedIssueDate = dayjs(issueDate).format('YYYY-MM-DDTHH:mm:ss');
    let formattedDueDate = dayjs(dueDate).format('YYYY-MM-DDTHH:mm:ss');

    this.isLoading = true;

    const Loan: LoanData = {
      bookID: this.form.value.book.id,
      userID: this.form.value.member.id,
      loanDate: formattedIssueDate,
      dueDate: formattedDueDate,
    }

    console.log(Loan);

    this.loansService.postLoan(Loan).subscribe({
        next: (res) => {
          this.isLoading = false
          this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Created succesfully'})
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

  addDays(date: Date, period: number) {
    date.setDate(date.getDate() + period)
    return date;
  }

  get statusValue() {
    return this.form.get('status')?.value;
  }

  onReset() {
    this.form.patchValue({
      book: null,
      member: null,
      issueDate: null,
      dueDate: null,
      status: null,
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
