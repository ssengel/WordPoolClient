import { HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest, 
    HttpResponse,
    HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
