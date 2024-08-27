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


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    BookListComponent,
    BookCardComponent,
    RatingComponent,
  ],
    imports: [
        CommonModule,
        BookRoutingModule,
        MenubarModule,
        ButtonModule,
        InputTextModule,
        NgOptimizedImage,
        CardModule,
        StyleClassModule
    ]
})
export class BookModule { }
