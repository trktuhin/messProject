import { Component, OnInit } from '@angular/core';
import { MemberInfo } from 'src/app/_models/memberInfo';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
})
export class MemberDetailsPage implements OnInit {
  selectedMember: MemberInfo;

  constructor(private route: ActivatedRoute, private memberService: MembersService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      const memberId = +params.get('memberId');
      this.memberService.getMember(memberId).subscribe(res => {
        this.selectedMember = res;
      }, err => console.log(err));
    });
  }

}
