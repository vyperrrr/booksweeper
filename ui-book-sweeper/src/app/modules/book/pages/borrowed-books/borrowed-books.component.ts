import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from "../../../../api/models/page-response-borrowed-book-response";
import {BookService} from "../../../../api/services/book.service";
import {BookResponse} from "../../../../api/models/book-response";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.scss'],
  providers: [MessageService]
})
export class BorrowedBooksComponent implements OnInit {

  page = 0;
  size = 10;

  borrowedBookResponse: PageResponseBorrowedBookResponse = {};

  constructor(
    private bookService: BookService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.findAllBorrowedBooks();
  }

  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks(
      {
        page: this.page,
        size: this.size
      }
    )
      .subscribe({
        next: response => {
          this.borrowedBookResponse = response;
        }
      })
  }

  returnBorrowedBook(book: BookResponse) {
    this.bookService.returnBook({
      bookId: book.id as number,
    })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Book returned successfully'
          });
          this.findAllBorrowedBooks();
        }
    })
  }
}
