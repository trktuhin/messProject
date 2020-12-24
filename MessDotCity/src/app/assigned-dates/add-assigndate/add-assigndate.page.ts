import { Component, OnInit } from '@angular/core';
import { MemberInfo } from 'src/app/_models/memberInfo';
import { AssignedDateService } from 'src/app/_services/assigned-date.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-add-assigndate',
  templateUrl: './add-assigndate.page.html',
  styleUrls: ['./add-assigndate.page.scss'],
})
export class AddAssigndatePage implements OnInit {

  members: MemberInfo[] = [];
  selectedDateType = "range";
  assignDateFrom: Date;
  assignDateTo: Date;
  customDates: Date[] = [
    null,
    null,
    null,
    null
  ];
  constructor(private memberService: MembersService
              , private assignedDateService: AssignedDateService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.memberInitialize();
  }
  memberInitialize() {
    this.memberService.getMembers().subscribe(res => {
      this.members = res;
    }, err => {
      console.log(err);
    });
  }

  submitDates() {
    console.log(this.customDates);
  }

}
