import {Book} from "../../books/model/book.model";
import {User} from "../../auth/models/user.model";

export interface LoanBookResponse {
  total: number;
  loans: LoanModel[];
}

export interface LoanModel {
  id: string;
  loanDate: string;
  dueDate: string;
  returnDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  isActive: boolean;
  book: Book;
  user: User;
}
