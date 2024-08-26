import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {BookService} from "../../../../api/services/book.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(
    private router: Router,
    private bookService: BookService
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
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}
