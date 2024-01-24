export interface EditLoanBook {
  bookID: string;
  userID: string;
  status: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
}
