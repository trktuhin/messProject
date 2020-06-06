import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ExpenseService } from '../_services/expense.service';
import { DailyExpense } from '../_models/dailyExpense';
import { totalmem } from 'os';
import { LoadingController } from '@ionic/angular';
import { SessionInfo } from '../_models/sessionInfo';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.page.html',
  styleUrls: ['./daily-expenses.page.scss'],
})
export class DailyExpensesPage implements OnInit {
  dailyExpenses: DailyExpense[] = [];
  sessions: SessionInfo[];
  selectedSessionId = 0;
  constructor(private router: Router, public authService: AuthService,
              private expesesService: ExpenseService,
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
      this.getDailyExpenses();
    });
  }

  onSessionChange() {
    this.getDailyExpenses();
   }

  getDailyExpenses() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.expesesService.getDailyExpenses(this.selectedSessionId).subscribe((res) => {
      this.dailyExpenses = res;
      loader.then(el => el.dismiss());
    }, err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
  }

  ionViewWillEnter() {
    this.getSessions();
  }

  editMeals(id: number) {
    this.router.navigate(['daily-expenses', 'edit-meals', id]);
  }

  geMealRate() {
    let totalExpense = 0;
    let totalMeal = 0;
    this.dailyExpenses.forEach(element => {
      totalExpense += element.expense;
      totalMeal += element.totalMeal;
    });
    return totalExpense / totalMeal;
  }


}
