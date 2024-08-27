import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {BookService} from "../../../../api/services/book.service";
import {PageResponseBookResponse} from "../../../../api/models/page-response-book-response";
import {PaginatorState} from "primeng/paginator";
import {BookResponse} from "../../../../api/models/book-response";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [MessageService]
})
export class BookListComponent implements OnInit {

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
    this.findAllBooks();
  }

  findAllBooks() {
    this.bookService.findAllBooks({
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
    this.findAllBooks();
  }

  borrowBook(book: BookResponse) {
    this.bookService.borrowBook(
      {
        bookId: book.id as number
      }
    )
      .subscribe(
        {
          next: (response) => {
            this.messageService.add({severity:'success', summary:'Success', detail: 'Book borrowed successfully'});
          },
          error: (error) => {
            this.messageService.add({severity:'error', summary:'Error', detail: error.error.error});
          }
        }
      )
  }
}

