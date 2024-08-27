import {Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from "../../../../api/models/page-response-book-response";
import {Router} from "@angular/router";
import {BookService} from "../../../../api/services/book.service";
import {MessageService} from "primeng/api";
import {PaginatorState} from "primeng/paginator";
import {BookResponse} from "../../../../api/models/book-response";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
  providers: [MessageService]
})
export class MyBooksComponent implements OnInit {
  page = 0;
  size = 10;
  bookResponse: PageResponseBookResponse = {};

  constructor(
    private router: Router,
    private bookService: BookService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.findMyBooks();
  }

  findMyBooks() {
    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size,
    })
      .subscribe({
        next: (response) => {
          this.bookResponse = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  handlePageChange($event: PaginatorState) {
    this.page = $event.page!;
    this.findMyBooks();
  }

  archiveBook($event: BookResponse) {

  }

  shareBook($event: BookResponse) {

  }

  editBook($event: BookResponse) {

  }
}
