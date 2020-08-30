import {Component, OnInit} from '@angular/core';
import {lorem} from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  randomText: string = '';
  enteredText: string = '';

  ngOnInit(): void {
    this.randomText = lorem.sentence();
  }

  onInput(value: string) {
    this.enteredText = value;

  }

  compare(randomLetter: string, enteredLetter: string) {
    if (!enteredLetter){
      return 'pending';
    }

    return randomLetter === enteredLetter ? 'correct' : 'incorrect';
  }
}


