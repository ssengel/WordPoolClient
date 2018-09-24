import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import * as Alertify from "alertifyjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService  {

  constructor() { }

  handleError(error: Response) {
    if (error.status === 401) {
      return throwError('Yetkilendirme Hatasi');
    }
    else if (error.status === 403) {
      return throwError('Yetki Seviyeniz Yeterli Degil')
    }
    else if (error.status === 400) {
      Alertify.error('Eksik veya Yanlis Istek')
      return throwError('Eksik veya Yanlis Istek')
    }
    else return throwError('Beklenmedik bir hata olustu.')
  }
}
