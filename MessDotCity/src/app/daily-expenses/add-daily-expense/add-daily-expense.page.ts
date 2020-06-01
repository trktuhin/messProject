import { Component, OnInit } from '@angular/core';
import { DailyExpense } from 'src/app/_models/dailyExpense';
import { MemberInfo } from 'src/app/_models/memberInfo';
import { MembersService } from 'src/app/_services/members.service';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-daily-expense',
  templateUrl: './add-daily-expense.page.html',
  styleUrls: ['./add-daily-expense.page.scss'],
})
export class AddDailyExpensePage implements OnInit {
  members: MemberInfo[] = [];
  totalExpense = 0;
  responsiblePerson = '';
  expenseDate = new Date().toISOString();
  constructor(private memberService: MembersService, private expenseService: ExpenseService,
              private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.memberInitialize();
  }
  memberInitialize() {
    this.memberService.getMembers().subscribe(res => {
      this.members = res;
      // console.log(this.members);
    }, err => {
      console.log(err);
    });
  }
  getTotalMeals() {
    let sum = 0;
    this.members.forEach(element => {
      sum += +element.dBreakfast;
      sum += +element.dLunch;
      sum += +element.dDinner;
    });
    return sum;
  }

  onSubmitDailyExpense() {
    const model = {
      responsibleMember: this.responsiblePerson,
      expense: this.totalExpense,
      day: this.expenseDate,
      members: this.members
    };
    this.expenseService.addDailyExpense(model).subscribe(()=> {
      this.router.navigate(['daily-expenses']);
    }, err => console.log(err));
  }

}
