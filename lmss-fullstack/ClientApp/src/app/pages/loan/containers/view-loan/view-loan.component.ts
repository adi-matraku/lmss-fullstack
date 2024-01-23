import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, switchMap, take} from "rxjs";
import {LoanBookResponse} from "../../model/loan-book-response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LoansService} from "../../services/loans.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {LoansStore} from "../../services/loans.store";

@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.component.html',
  styleUrls: ['./view-loan.component.scss']
})
export class ViewLoanComponent implements OnInit {

  book$: Observable<LoanBookResponse | null> = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) =>
      id
        ? this.loansService.getLoanBookById(id).pipe(
          catchError((err) => {
            this.messageService.add({key: 'toast', detail: 'Error', severity: 'error', summary: 'Book not found'})
            return of(null);
          })
        )
        : of(null)
    )
  );

  constructor(private loansService: LoansService, private route: ActivatedRoute, private messageService: MessageService,
              private store: LoansStore, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  onDelete() {
    console.log(this.book$);

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if(id) {
      this.confirmationService.confirm({
        accept: () => {
          this.loansService.singleLoanDeleteBook(id).pipe(take(1)).subscribe({
            next: (res) => {
              this.messageService.add({key: 'toast', detail: 'Success', severity: 'success', summary: 'Deleted succesfully'})
              this.store.load({})
              this.router.navigate(['../loan'])
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
