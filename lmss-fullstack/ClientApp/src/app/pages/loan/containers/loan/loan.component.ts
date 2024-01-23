import {Component, ViewChild} from '@angular/core';
import {LoansStore} from "../../services/loans.store";
import {LoansTableComponent} from "../../components/loans-table/loans-table.component";
import {take} from "rxjs";
import {LoansService} from "../../services/loans.service";
import {ConfirmationService, MessageService} from "primeng/api";
import * as FileSaver from "file-saver";
import {exportExcel} from "../../../../shared/export-excel/export-excel.function";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent {

  loansSelection: [] = [];

  @ViewChild(LoansTableComponent) table!: LoansTableComponent;

  constructor(public store: LoansStore, private loansService: LoansService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.store.load({});
  }

  exportFile() {
    exportExcel(this.table.books)
  }

  selectedLoans(event: any) {
    this.loansSelection = event
    console.log(event);
  }

  searchParams(event: any) {
    this.store.load ({
      book: event.book,
      member: event.member,
      issueFromDateRange: event.issueFromDateRange,
      issueToDateRange: event.issueToDateRange,
      dueFromDateRange: event.dueFromDateRange,
      dueToDateRange: event.dueToDateRange,
      returnFromDateRange: event.returnFromDateRange,
      returnToDateRange: event.returnToDateRange,
      status: event.status,
      })
  }

  paginate(event: any) {
    console.log(event);
    this.store.load({limit: event.rows, offset: event.first})
  }

  sort(orderBy: string): void {
    console.log(orderBy)
    this.store.load({orderBy, offset: 0});
  }

  onDeleteButton() {
    console.log(this.table.selectedBooks)

    if(this.table.selectedBooks.length !== 0) {
      this.confirmationService.confirm({
        accept: () => {
          this.loansService.deleteLoans(this.table.selectedBooks).pipe(take(1)).subscribe({
            next: (res) => {
              this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Deleted succesfully'})
              this.table.selectedBooks.length = 0;
              this.store.load({})
            },
            error: err => {
              this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: err.message})
              console.log(err);
            }
          })
        }
      })
    }

  }

}
