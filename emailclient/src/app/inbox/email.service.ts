import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {Email} from './email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  emailsMock = [
    {
      id: '1234',
      subject: 'Test 01',
      from: 'sanjin.dumancic@yahoo.com'
    },
    {
      id: '5678',
      subject: 'Test 02',
      from: 'sanjin.dumancic@yahoo.com'
    }
  ];

  email = [
    {
      id: '1234',
      subject: 'Test 01',
      from: 'sanjin.dumancic@yahoo.com',
      to: 'sanjin.dumancic@yahoo.com',
      text: 'This is a test',
      html: '\<div\> This is a test\<\/div\>'
    },
    {
      id: '5678',
      subject: 'Test 02',
      from: 'sanjin.dumancic@yahoo.com',
      to: 'sanjin.dumancic@yahoo.com',
      text: 'This is a test',
      html: '\<div\> This is a test\<\/div\>'
    }
  ];

  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails() {
    return of(this.emailsMock); //this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  getEmail(id: string) {
    let result = null;
    for (const entry of this.email) {
      if (entry.id === id) {
        result = entry;
      }
    }

    if (result === null) {
      return throwError('oops!');
    } else {
      return of(result);
    }

    //return this.http.get<Email>(`${this.rootUrl}/emails/${id}`);
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.rootUrl}/emails`,email);
  }
}
