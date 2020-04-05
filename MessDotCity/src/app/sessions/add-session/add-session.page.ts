import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.page.html',
  styleUrls: ['./add-session.page.scss'],
})
export class AddSessionPage implements OnInit {
  sessionForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createSessionForm();
  }

  createSessionForm() {
    this.sessionForm = this.fb.group({
      sessionName: ['', [Validators.required, Validators.maxLength(15)]],
      sessionStart: [new Date().toISOString(), [Validators.required]],
      sessionEnd: ['', [Validators.required]]
    });
  }

}
