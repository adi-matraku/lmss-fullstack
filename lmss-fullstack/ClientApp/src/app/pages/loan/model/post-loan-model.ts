export interface LoanData {
  status: string;
  dueDate: string;
  issueDate: string;
  member: string;
  book: string;
}

export interface LoanPost {
  data: LoanData;
}
