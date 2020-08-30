import { Component } from '@angular/core';
import { WikipediaService} from './wikipedia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages = [];

  constructor (private wikipediaService: WikipediaService){}

  onTerm(term: string) {
  console.log(term);
    this.wikipediaService.search(term).subscribe( (response) => {
      this.pages = response;
    });

  }
}
