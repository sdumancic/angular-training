import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConvertMilesToKmPipe } from './convert-miles-to-km.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConvertMilesToKmPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
