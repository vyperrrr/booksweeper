import {Component, OnInit} from '@angular/core';
import {FileUploadHandlerEvent} from "primeng/fileupload";
import {BookRequest} from "../../../../api/models/book-request";
import {BookService} from "../../../../api/services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.scss'],
  providers: [MessageService]
})
export class UploadBookComponent implements OnInit {

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
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if(bookId){
      this.bookService.findBookById({
        bookId,
      })
        .subscribe(
          {
            next: (book) => {
              this.bookRequest = {
                title: book.title as string,
                authorName: book.authorName as string,
                isbn: book.isbn as string,
                synopsis: book.synopsis as string,
                shareable: book.shareable,
              }
            }
          }
        )
    }
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

            if (!this.bookCover) {
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
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: 'Book with image uploaded successfully'
                    });
                  },
                  error: (error) => {
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: 'Book uploaded successfully, but image upload failed'
                    });
                  }
                }
              )
          },
          error: (error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Book upload failed, make sure all fields are filled'});
          }
        }
      )
  }

  cancelUploadBook() {
    this.router.navigate(['/books/my-books']);
  }
}
