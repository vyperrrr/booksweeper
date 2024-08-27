import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from "../../../../api/models/book-response";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

   private _book: BookResponse = {};
   private _showManagement = false;

  get book() {
    return this._book;
  }

  @Input()
  set book(book: BookResponse) {
    this._book = book;
  }

  get showManagement() {
    return this._showManagement;
  }

  @Input()
  set showManagement(showManagement: boolean) {
    this._showManagement = showManagement;
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private bookmark: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onBookmark() {
    this.bookmark.emit(this.book);
  }

  onBorrow() {
    this.borrow.emit(this.book);
  }

  onShowDetails() {
    this.details.emit(this.book);
  }

  onArchive() {
    this.archive.emit(this.book);
  }

  onShare() {
    this.share.emit(this.book);
  }

  onEdit() {
    this.edit.emit(this.book);
  }
}
