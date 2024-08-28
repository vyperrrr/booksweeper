import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {MyBooksComponent} from "./pages/my-books/my-books.component";
import {UploadBookComponent} from "./pages/upload-book/upload-book.component";
import {BorrowedBooksComponent} from "./pages/borrowed-books/borrowed-books.component";
import {ReturnedBooksComponent} from "./pages/returned-books/returned-books.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'my-books',
        component: MyBooksComponent
      },
      {
        path: 'my-books/upload-book',
        component: UploadBookComponent
      },
      {
        path: 'my-books/upload-book/:bookId',
        component: UploadBookComponent
      },
      {
        path: 'borrowed-books',
        component: BorrowedBooksComponent
      },
      {
        path: 'returned-books',
        component: ReturnedBooksComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
