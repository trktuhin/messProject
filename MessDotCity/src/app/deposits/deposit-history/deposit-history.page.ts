import { Component, OnInit } from '@angular/core';
import { DepositInfo } from 'src/app/_models/depositInfo';

@Component({
  selector: 'app-deposit-history',
  templateUrl: './deposit-history.page.html',
  styleUrls: ['./deposit-history.page.scss'],
})
export class DepositHistoryPage implements OnInit {

  selectedMember = {
    memberId: 1,
    memberName: 'Robin Khan'
  };
  selectedMemberdeposits: DepositInfo[] = [
    {
      depositId: 1,
      depositAmount: 2000,
      depositType: 'add',
      depositDate: new Date(2020, 0, 2),
      remarks: '1st installment'
    },
    {
      depositId: 2,
      depositAmount: 500,
      depositType: 'add',
      depositDate: new Date(2020, 0, 12),
      remarks: '2nd installment'
    },
    {
      depositId: 3,
      depositAmount: 300,
      depositType: 'withdraw',
      depositDate: new Date(2020, 0, 15),
      remarks: 'For electricity due'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  getTotalAdd() {
    let add = 0;
    this.selectedMemberdeposits.forEach(element => {
      if(element.depositType === 'add') {
        add += element.depositAmount;
      }
    });
    return add;
  }

  getTotalWithdraw() {
    let withdraw = 0;
    this.selectedMemberdeposits.forEach(element => {
      if(element.depositType === 'withdraw') {
        withdraw += element.depositAmount;
      }
    });
    return withdraw;
  }

  getTotalBalance() {
    return this.getTotalAdd() - this.getTotalWithdraw();
  }

}
