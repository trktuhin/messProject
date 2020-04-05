import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-mess',
  templateUrl: './update-mess.page.html',
  styleUrls: ['./update-mess.page.scss'],
})
export class UpdateMessPage implements OnInit {
  messForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createmessForm();
  }

  createmessForm() {
    this.messForm = this.fb.group({
      messName: ['Mess name'],
      location: ['Kolabagan, Dhaka', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      updateFrom: [new Date().toISOString(), [Validators.required]],
      updateTo: [ new Date().toISOString(), [Validators.required]],
      secretCode: ['12d5', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      selfMember: [true]
    }, {
      validators: [this.updateTimeValidator, this.secretCodeValidator]
    });
  }

  updateTimeValidator(g: FormGroup) {
    return g.get('updateFrom').value < g.get('updateTo').value ? null : {timeInvalid: true};
  }

  secretCodeValidator(g: FormGroup) {
    return (/^[a-zA-Z0-9]*$/.test(g.get('secretCode').value.toString())) ? null : {whiteSpaceCode: true};
  }

  updateMess() {
    console.log(this.messForm);
  }

}
