import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberInfo } from 'src/app/_models/memberInfo';
import { MembersService } from 'src/app/_services/members.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  memberForm: FormGroup;
  constructor(private fb: FormBuilder, private memberService: MembersService, private router: Router) { }

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
    const model: MemberInfo = {
      firstName: this.memberForm.get('firstName').value,
      lastName: this.memberForm.get('lastName').value,
      dBreakfast: this.memberForm.get('dBreakfast').value,
      dLunch: this.memberForm.get('dLunch').value,
      dDinner: this.memberForm.get('dDinner').value
    };

    this.memberService.addMember(model).subscribe((res) => {
      this.router.navigate(['members']);
    }, err => console.log(err));
  }
}
