export interface Member {
    emailVerified: boolean;
    disabled: boolean;
    roles: string[];
    _id: string;
    email: string;
    password: string;
    firstName: string;
    fullName: string;
    avatars: any[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    authenticationUid: string;
    lastName: string;
    phoneNumber: string;
    updatedBy: string;
    id: string;
  }

  export interface Book {
    isbn: string;
    title: string;
    author: string;
    numberOfCopies: number;
    stock: number;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
  }

  export interface LoanBookResponse {
    _id: string;
    status: string;
    dueDate: Date;
    loanDate: Date;
    user: Member;
    book: Book;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    id: string;
  }

