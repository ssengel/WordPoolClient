import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(currentUser){
            req = req.clone({
                headers: req.headers.set('x-access-token', currentUser.token)
                        .set('device', 'angular')
            })
        }
        
        return next.handle(req).pipe(
            tap(
                (succ:HttpResponse<any>) => {

                },
                (err:HttpErrorResponse) => {
                    if(err.status === 403){
                        console.log("Yasak alan");
                        this.router.navigate(['']);
                    }
                    else if(err.status === 401){
                        console.log("Kullanici girisi basarisiz");
                        localStorage.removeItem('currentUser');
                        this.router.navigate(['login'])
                    }
                    else if(err.status === 0){
                        console.log('Sunucuya Erisim saglanamadi')
                        localStorage.removeItem('currentUser');
                        this.router.navigate(['login']);
                    }
                    
                }
            ))
    }
}
