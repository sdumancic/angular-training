import {Component, OnInit} from '@angular/core';
import { AuthService} from './auth/auth.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  signedIn$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedIn$ = authService.signedIn$;
  }

  ngOnInit(): void {
    this.authService.checkAuth()
      .subscribe();
  }

}

