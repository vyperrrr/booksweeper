import {Component} from '@angular/core';
import {FileUploadHandlerEvent} from "primeng/fileupload";
import {BookRequest} from "../../../../api/models/book-request";
import {BookService} from "../../../../api/services/book.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.scss'],
  providers: [MessageService]
})
export class UploadBookComponent {

  bookRequest: BookRequest = {
    title: '',
    authorName: '',
    isbn: '',
    synopsis: '',
    shareable: false,
  };

  bookCover: File | undefined = undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private messageService: MessageService,
  ) {
  }

  handleFileUpload($event: FileUploadHandlerEvent) {
    this.bookCover = $event.files[0];
  }

  uploadBook() {
    this.bookService.saveBook(
      {
        body: this.bookRequest,
      }
    )
      .subscribe(
        {
          next: (bookId) => {

            if(!this.bookCover) {
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Book uploaded successfully'});
              return;
            }

            this.bookService.uploadBookCover(
              {
                bookId: bookId,
                body: {
                  file: this.bookCover,
                }
              }
            )
              .subscribe(
                {
                  next: () => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Book uploaded successfully'});
                  },
                  error: (error) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.validationErrors});
                  }
                }
              )
          },
          error: (error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.validationErrors});
          }
        }
      )
  }

  cancelUploadBook() {

  }
}
