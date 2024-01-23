export interface BookEditModel {
  id: string,
  data: {
    isbn: string,
    title: string,
    author: string,
    numberOfCopies: number,
    images: []
  }
}
