import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {Email} from './email';
import {EmailService} from './email.service';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email>{

  constructor(private emailService: EmailService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Email> | Promise<Email> | Email {
    const { id } = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError( (err) => {
        console.log('error');
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }

}
