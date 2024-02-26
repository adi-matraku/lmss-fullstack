import {Component, OnInit, ViewChild} from '@angular/core';
import {LoansStore} from "../../services/loans.store";
import {LoansTableComponent} from "../../components/loans-table/loans-table.component";
import {take} from "rxjs";
import {LoansService} from "../../services/loans.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {exportExcel} from "../../../../shared/export-excel/export-excel.function";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit{

  loansSelection: [] = [];

  @ViewChild(LoansTableComponent) table!: LoansTableComponent;

  constructor(public store: LoansStore, private loansService: LoansService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.store.load({});
  }

  exportFile() {
    console.log(this.table.books, 'BOOKS');
    exportExcel(this.table.books, 'Loans')
  }

  selectedLoans(event: any) {
    this.loansSelection = event
    console.log(event);
  }

  searchParams(event: any) {
    console.log(event);
    this.store.load({
      bookID: event.book,
      userID: event.member,
      loanDateStart: event.issueFromDateRange,
      loanDateEnd: event.issueToDateRange,
      dueFromDateRange: event.dueFromDateRange,
      dueToDateRange: event.dueToDateRange,
      returnFromDateRange: event.returnFromDateRange,
      returnToDateRange: event.returnToDateRange,
      status: event.status,
    })
  }

  paginate(event: any) {
    console.log(event);
    this.store.load({pageSize: event.rows, pageNumber: event.first + 1})
  }

  sort(orderBy: string): void {
    console.log(orderBy)
    this.store.load({orderBy, pageNumber: 1});
  }

  onDeleteButton() {
    console.log(this.table.selectedBooks)

    if (this.table.selectedBooks.length !== 0) {
      this.confirmationService.confirm({
        accept: () => {
          this.loansService.deleteLoans(this.table.selectedBooks).pipe(take(1)).subscribe({
            next: () => {
              this.messageService.add({
                key: 'toast',
                detail: 'Success',
                severity: 'success',
                summary: 'Deleted succesfully'
              })
              this.table.selectedBooks.length = 0;
              this.store.load({})
            },
            error: err => {
              this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.error})
              console.log(err);
            }
          })
        }
      })
    }

  }

}
