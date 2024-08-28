import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { MainComponent } from './pages/main/main.component';
import {MenubarModule} from "primeng/menubar";
import { MenuComponent } from './components/menu/menu.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import {CardModule} from "primeng/card";
import {StyleClassModule} from "primeng/styleclass";
import { RatingComponent } from './components/rating/rating.component';
import {PaginatorModule} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { UploadBookComponent } from './pages/upload-book/upload-book.component';
import {CheckboxModule} from "primeng/checkbox";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextareaModule} from "primeng/inputtextarea";
import { BorrowedBooksComponent } from './pages/borrowed-books/borrowed-books.component';
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    BookListComponent,
    BookCardComponent,
    RatingComponent,
    MyBooksComponent,
    UploadBookComponent,
    BorrowedBooksComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    NgOptimizedImage,
    CardModule,
    StyleClassModule,
    PaginatorModule,
    ToastModule,
    RippleModule,
    CheckboxModule,
    FileUploadModule,
    InputTextareaModule,
    TableModule
  ]
})
export class BookModule { }
