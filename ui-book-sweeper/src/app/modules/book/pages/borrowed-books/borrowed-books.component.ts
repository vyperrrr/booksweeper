import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from "../../../../api/models/page-response-borrowed-book-response";
import {BookService} from "../../../../api/services/book.service";
import {BookResponse} from "../../../../api/models/book-response";
import {MessageService} from "primeng/api";
import {BorrowedBookResponse} from "../../../../api/models/borrowed-book-response";
import {FeedbackRequest} from "../../../../api/models/feedback-request";
import {FeedbackService} from "../../../../api/services/feedback.service";

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

  selectedBook: BookResponse | undefined = undefined;

  feedbackRequest: FeedbackRequest = {
    bookId: 0,
    comment: '',
    rate: undefined,
  }

  constructor(
    private bookService: BookService,
    private messageService: MessageService,
    private feedbackService: FeedbackService
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

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBook({
      bookId: this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book returned successfully'
        });
        this.findAllBorrowedBooks();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.error
        });
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    });
  }

  getReturnStatus(book: BorrowedBookResponse) {
    if (!book.returned)
      return 'Not yet returned';
    if (book.returned && !book.returnApproved)
      return 'Returned';
    return 'Returned and return approved';
  }
}
