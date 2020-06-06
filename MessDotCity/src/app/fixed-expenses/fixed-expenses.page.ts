import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FixedExpense } from '../_models/fixedExpense';
import { ExpenseService } from '../_services/expense.service';
import { MembersService } from '../_services/members.service';
import { AuthService } from '../_services/auth.service';
import { LoadingController } from '@ionic/angular';
import { SessionInfo } from '../_models/sessionInfo';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-fixed-expenses',
  templateUrl: './fixed-expenses.page.html',
  styleUrls: ['./fixed-expenses.page.scss'],
})
export class FixedExpensesPage implements OnInit {
  totalMembers = 0;
  fixedExpenses: FixedExpense[] = [];
  sessions: SessionInfo[];
  selectedSessionId = 0;
  constructor(private router: Router, private expenseService: ExpenseService,
              private memberService: MembersService,
              public authService: AuthService,
              private loadingCtrl: LoadingController,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  getSessions() {
    this.profileService.getSessions().subscribe(res => {
      this.sessions = res;
      if (res[0]) {
        this.selectedSessionId = res[0].id;
      }
      this.getFixedExpenses();
      this.getMemberList();
    });
  }

  onSessionChange() {
    this.getFixedExpenses();
    this.getMemberList();
  }

  getFixedExpenses() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.expenseService.getFixedExpenses(this.selectedSessionId).subscribe((res) => {
      this.fixedExpenses = res;
      loader.then(el => el.dismiss());
    }, err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
  }

  getMemberList() {
    this.memberService.getMembers().subscribe((res) => {
      const members = res;
      this.totalMembers = members.length;
    }, err => {
      console.log(err);
    });
  }

  ionViewWillEnter() {
    this.getSessions();
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
