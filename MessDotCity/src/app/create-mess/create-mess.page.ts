import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessService } from '../_services/mess.service';

@Component({
  selector: 'app-create-mess',
  templateUrl: './create-mess.page.html',
  styleUrls: ['./create-mess.page.scss'],
})
export class CreateMessPage implements OnInit {
  messForm: FormGroup;
  constructor(private fb: FormBuilder, private messService: MessService) { }

  ngOnInit() {
    this.createmessForm();
  }

  createmessForm() {
    this.messForm = this.fb.group({
      messName: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      updateFrom: [null, [Validators.required]],
      updateTo: [null, [Validators.required]],
      secretCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      selfMember: [true]
    }, {
      validators: [this.updateTimeValidator, this.messNameValidator, this.secretCodeValidator]
    });
  }

  createMess() {
    const model = {
      messName: this.messForm.get('messName').value,
      location: this.messForm.get('location').value,
      MealChangeFrom: this.messForm.get('updateFrom').value,
      MealChangeTo: this.messForm.get('updateTo').value,
      secretCode: this.messForm.get('secretCode').value
    };
    console.log(model);
    this.messService.createMess(model).subscribe(res => {

    }, err => console.log(err));
  }

  updateTimeValidator(g: FormGroup) {
    return g.get('updateFrom').value < g.get('updateTo').value ? null : {timeInvalid: true};
  }

  messNameValidator(g: FormGroup) {
    return (/^[a-zA-Z0-9]*$/.test(g.get('messName').value.toString())) ? null : {whiteSpaceName: true};
  }

  secretCodeValidator(g: FormGroup) {
    return (/^[a-zA-Z0-9]*$/.test(g.get('secretCode').value.toString())) ? null : {whiteSpaceCode: true};
  }
}
