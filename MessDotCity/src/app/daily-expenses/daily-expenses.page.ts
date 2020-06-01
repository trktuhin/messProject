import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ExpenseService } from '../_services/expense.service';
import { DailyExpense } from '../_models/dailyExpense';
import { totalmem } from 'os';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.page.html',
  styleUrls: ['./daily-expenses.page.scss'],
})
export class DailyExpensesPage implements OnInit {
  dailyExpenses: DailyExpense[] = [];
  constructor(private router: Router, public authService: AuthService,
              private expesesService: ExpenseService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.expesesService.getDailyExpenses().subscribe((res) => {
      this.dailyExpenses = res;
      loader.then(el => el.dismiss());
    }, err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
  }

  editMeals(id: number) {
    // const exDate = new Date(dateToEditString);
    // const dateString = exDate.getFullYear() + '-' + exDate.getMonth() + '-' + exDate.getDate();
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
