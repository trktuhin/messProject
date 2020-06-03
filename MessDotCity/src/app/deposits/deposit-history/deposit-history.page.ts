import { Component, OnInit } from '@angular/core';
import { DepositInfo } from 'src/app/_models/depositInfo';
import { MemberInfo } from 'src/app/_models/memberInfo';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from 'src/app/_services/members.service';
import { DepositService } from 'src/app/_services/deposit.service';

@Component({
  selector: 'app-deposit-history',
  templateUrl: './deposit-history.page.html',
  styleUrls: ['./deposit-history.page.scss'],
})
export class DepositHistoryPage implements OnInit {

  selectedMember: MemberInfo;
  selectedMemberdeposits = [];
  memberId = 0;
  constructor(private route: ActivatedRoute, private memberService: MembersService,
              private depositService: DepositService) { }

  ngOnInit() {
  }

  getMemberDetails() {
    this.route.paramMap.subscribe(params => {
      this.memberId = +params.get('memberId');
      this.memberService.getMember(this.memberId).subscribe(res => {
        this.selectedMember = res;
        this.depositInitialize();
      }, err => console.log(err));
    });
  }

  depositInitialize() {
    this.depositService.getDepositHistory(this.memberId).subscribe((res: any) => {
      this.selectedMemberdeposits = res;
    }, err => console.log(err));
  }

  ionViewWillEnter() {
    this.getMemberDetails();
  }

  getTotalAdd() {
    let debit = 0;
    this.selectedMemberdeposits.forEach(element => {
      debit += element.debit;
    });
    return debit;
  }

  getTotalWithdraw() {
    let credit = 0;
    this.selectedMemberdeposits.forEach(element => {
      credit += element.credit;
    });
    return credit;
  }

  getTotalBalance() {
    return this.getTotalAdd() - this.getTotalWithdraw();
  }

}
