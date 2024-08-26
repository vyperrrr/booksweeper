import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { MainComponent } from './pages/main/main.component';
import {MenubarModule} from "primeng/menubar";
import { MenuComponent } from './components/menu/menu.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { BookListComponent } from './pages/book-list/book-list.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    BookListComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    NgOptimizedImage
  ]
})
export class BookModule { }
