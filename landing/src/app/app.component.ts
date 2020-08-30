import { Component } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {map, multicast, share, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'landing';

  ngOnInit(){

    console.log('Observables are unicast, subjects are multicast');
    // our observable, built to fire initially
    const observable = Observable.create((observer) => {
      observer.next(Math.random());
    })

    //our subject
    const subject = new Subject();

    //first subscriber to subject
    subject.subscribe((data) => {
      console.log(`Subject subscriber 1 recieves ${data}`)
    })

    //second subscriber to subject
    subject.subscribe((data) => {
      console.log(`Subject subscriber 2 recieves ${data}`)
    })

    //firing the subject
    subject.next(Math.random());

    //first subscriber to observable
    observable.subscribe((data) => {
      console.log(`Observable subscriber 1 recieves ${data}`);
    });

    //second subscriber to observable
    observable.subscribe((data) => {
      console.log(`Observable subscriber 2 recieves ${data}`);
    });

    const shared = observable.pipe(shareReplay());

    shared.subscribe((data) => {
      console.log(`Shared subscriber 1 recieves ${data}`);
    })

    shared.subscribe((data) => {
      console.log(`Shared subscriber 2 recieves ${data}`);
    })


  }
}
