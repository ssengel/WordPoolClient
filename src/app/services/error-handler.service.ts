import { Injectable, ErrorHandler } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: Error | HttpErrorResponse) {

      if (error instanceof HttpErrorResponse) {
         // Server or connection error happened
         if (!navigator.onLine) {
           // Handle offline error
         } else {
           // Handle Http Error (error.status === 403, 404...)
         }
      } else {
        // Handle Client Error (Angular Error, ReferenceError...)     
      }
   
     // Log the error anyway
      console.error('Error Handler Service: ', error);

      // throw error;
      // if (error === 401) {
      //   console.log('giris basarisiz')
      //   throw error;
      // }
      // if (error.status === 403) {
      //   return throwError('Yetki Seviyeniz Yeterli Degil')
      // }
      // if (error.status === 400) {
      //   return throwError('Eksik veya Yanlis Istek')
      // }
      
      // return throwError('Beklenmedik bir hata olustu.')
  }
}
