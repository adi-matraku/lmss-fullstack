import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoansService} from "../../services/loans.service";
import {take} from "rxjs";
import {UntypedFormBuilder} from "@angular/forms";
import {LoansParams} from "../../services/loans.store";
import {formatDates} from "../../utils/formatDates.function";
import {AutocompleteModel} from "../../model/autocomplete.model";

@Component({
  selector: 'app-loans-form',
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.scss']
})

export class LoansFormComponent implements OnInit {

  books!: AutocompleteModel[];
  members!: AutocompleteModel[];

  issueFromDate!: string | null;
  issueToDate!: string | null;
  dueFromDate!: string | null;
  dueToDate!: string | null;
  returnFromDate!: string | null;
  returnToDate!: string | null;

  @Output() searchQuery = new EventEmitter<{}>();

  @Input() set formValue(params: LoansParams) {
    this.form.patchValue({
      book: params.bookID,
      member: params.userID,
      issueFromDateRange: params.issueFromDateRange,
      issueToDateRange: params.issueToDateRange,
      dueFromDateRange: params.dueFromDateRange,
      dueToDateRange: params.dueToDateRange,
      returnFromDateRange: params.returnFromDateRange,
      returnToDateRange: params.returnToDateRange,
      status: params.status,
    })
  }

  constructor(private loansService: LoansService, private fb: UntypedFormBuilder) {
  }

  availability = [
    {label: '--', value: null},
    {label: 'In progress', value: 'inProgress'},
    {label: 'Overdue', value: 'overdue'},
    {label: 'Closed', value: 'Closed'}
  ];

  form = this.fb.group({
    book: null,
    member: null,
    issueDate: null,
    dueDate: null,
    returnDate: null,
    status: [],
  });

  ngOnInit() {
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

  // selectMember(event: any) {
  //   console.log(event);
  // }

  /////////////////////////////

  onSearch() {
    // console.log(this.form.value);
    // console.log(this.form.value.dueDate);
    // console.log(this.form.value.issueDate);

    if (this.form.value.issueDate) {
      this.issueFromDate = formatDates(this.form.value.issueDate[0])
      this.issueToDate = formatDates(this.form.value.issueDate[1])
    }

    if (this.form.value.dueDate) {
      this.dueFromDate = formatDates(this.form.value.dueDate[0])
      this.dueToDate = formatDates(this.form.value.dueDate[1])
    }

    if (this.form.value.returnDate) {
      this.returnFromDate = formatDates(this.form.value.returnDate[0])
      this.returnToDate = formatDates(this.form.value.returnDate[1])
    }

    const object = {
      book: this.form.value.book?.id,
      member: this.form.value.member?.id,
      issueFromDateRange: this.issueFromDate,
      issueToDateRange: this.issueToDate,
      dueFromDateRange: this.dueFromDate,
      dueToDateRange: this.dueToDate,
      returnFromDateRange: this.returnFromDate,
      returnToDateRange: this.returnToDate,
      status: this.form.value.status,
    }

    console.log(object);
    this.searchQuery.emit(object)
  }

  reset() {
    this.searchQuery.emit({
      offset: 0,
      member: null,
      book: null,
      status: null,
      issueFromDateRange: null,
      issueToDateRange: null,
      dueFromDateRange: null,
      dueToDateRange: null,
      returnFromDateRange: null,
      returnToDateRange: null,
    })

    this.form.patchValue({
      issueDate: null,
      dueDate: null,
      returnDate: null,
    })
  }

}
