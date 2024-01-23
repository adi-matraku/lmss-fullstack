export interface EditLoanBook {
  book: string;
  status: string;
  member: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
}

export interface EditedLoanBook {
  id: string,
  data: EditLoanBook,
}
