import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixedExpense } from '../_models/fixedExpense';
import { ExpenseService } from '../_services/expense.service';
import { MembersService } from '../_services/members.service';
import { AuthService } from '../_services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-fixed-expenses',
  templateUrl: './fixed-expenses.page.html',
  styleUrls: ['./fixed-expenses.page.scss'],
})
export class FixedExpensesPage implements OnInit {
  totalMembers = 0;
  fixedExpenses: FixedExpense[] = [];
  constructor(private router: Router, private expenseService: ExpenseService,
              private memberService: MembersService,
              public authService: AuthService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.expenseService.getFixedExpenses().subscribe((res) => {
      this.fixedExpenses = res;
      loader.then(el => el.dismiss());
    }, err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
    this.memberService.getMembers().subscribe((res) => {
      const members = res;
      this.totalMembers = members.length;
      loader.then(el => el.dismiss());
    }, err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
    }

  getPerMemberCost() {
    let sum = 0;
    this.fixedExpenses.forEach(element => {
      sum += element.amount;
    });
    return sum / this.totalMembers;
  }

  editExpense(id: number) {
    this.router.navigate(['fixed-expenses', 'edit-expense', id]);
  }

}
