export interface BookResponse {
  total: number;
  books: BookModel[];
}

export interface BookModel {
  id: string
  isbn: string,
  title: string,
  author: string,
  numberOfCopies: number,
  stock: number,
  availabilityStatus: number,
  createdAt: string,
  updatedAt: string,
  createdBy: string,
  updatedBy: string,
  isActive: boolean
}
