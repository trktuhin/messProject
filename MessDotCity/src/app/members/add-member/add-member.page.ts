import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  memberForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createMemberForm();
  }

  createMemberForm() {
    this.memberForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.maxLength(12)]],
      dBreakfast: [0, [Validators.required]],
      dLunch: [1, [Validators.required]],
      dDinner: [1, [Validators.required]]
    });
  }

  addMember() {
    console.log(this.memberForm);
  }
}
