import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = `http://127.0.0.1:8000/api/v1/${req.url}`
        if (req.url.match('login')){
            const cloned = req.clone({ url: url })
            return next.handle(cloned)
        }
        else {
            const token = localStorage.getItem('token')
            if (token) {
                const cloned = req.clone({
                    url: url ,
                    headers: req.headers.set("Authorization", "Token " + token)
                })
                return next.handle(cloned);
            }
            else {
                const cloned = req.clone({ url: url })
                return next.handle(cloned)
            }
        }
        
       
    }
}