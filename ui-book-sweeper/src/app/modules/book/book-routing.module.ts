import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {MyBooksComponent} from "./pages/my-books/my-books.component";
import {UploadBookComponent} from "./pages/upload-book/upload-book.component";
import {BorrowedBooksComponent} from "./pages/borrowed-books/borrowed-books.component";
import {ReturnedBooksComponent} from "./pages/returned-books/returned-books.component";
import {authGuard} from "../../services/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: BookListComponent,
        canActivate: [authGuard],
      },
      {
        path: 'my-books',
        component: MyBooksComponent,
        canActivate: [authGuard],
      },
      {
        path: 'my-books/upload-book',
        component: UploadBookComponent,
        canActivate: [authGuard],
      },
      {
        path: 'my-books/upload-book/:bookId',
        component: UploadBookComponent,
        canActivate: [authGuard],
      },
      {
        path: 'borrowed-books',
        component: BorrowedBooksComponent,
        canActivate: [authGuard],
      },
      {
        path: 'returned-books',
        component: ReturnedBooksComponent,
        canActivate: [authGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
