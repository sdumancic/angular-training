import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts = [
    {title: 'Neat tree', imageUrl: 'assets/tree.jpeg', username: 'nature', content: 'I saw this neat tree today'},
    {title: 'Snowy mountain', imageUrl: 'assets/mountain.jpeg', username: 'mountainlover', content: 'Here is picture of mountain'},
    {title: 'Mountain Biking', imageUrl: 'assets/biking.jpeg', username: 'biking1222', content: 'I did some biking today'}
  ];
}
