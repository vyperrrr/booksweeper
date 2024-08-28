import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from "../../../../api/models/page-response-borrowed-book-response";
import {BookService} from "../../../../api/services/book.service";
import {MessageService} from "primeng/api";
import {BookResponse} from "../../../../api/models/book-response";

@Component({
  selector: 'app-returned-books',
  templateUrl: './returned-books.component.html',
  styleUrls: ['./returned-books.component.scss'],
  providers: [MessageService]
})
export class ReturnedBooksComponent implements OnInit {

  page = 0;
  size = 10;

  returnedBookResponse: PageResponseBorrowedBookResponse = {};

  constructor(
    private bookService: BookService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.findAllReturnedBooks();
  }

  findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks(
      {
        page: this.page,
        size: this.size
      }
    )
      .subscribe({
        next: (response) => {
          this.returnedBookResponse = response;
        }
      })
  }

  approveBookReturn(returnedBook: BookResponse) {
    this.bookService.approveReturnedBook({
      bookId: returnedBook.id as number,
    })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Book return approved'
          });
          this.findAllReturnedBooks();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.error
          });
        }
      })
  }
}
