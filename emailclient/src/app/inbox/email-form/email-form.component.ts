import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Email} from '../email';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  emailForm: FormGroup;
  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    const { subject, from, to, text} = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value: from, disabled: true}),
      text: new FormControl(text, [Validators.required] ),
      subject: new FormControl(subject, [Validators.required])
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    console.log(this.emailForm.getRawValue());
    this.emailSubmit.next(this.emailForm.value);
  }

}
