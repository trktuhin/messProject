import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.page.html',
  styleUrls: ['./daily-expenses.page.scss'],
})
export class DailyExpensesPage implements OnInit {
  dailyExpeses = [
    {
      totalExpense: 400,
      expenseDate: new Date(2020, 0, 1),
      responsibleMember: 'Robin Khan',
      totalMeals: 8
    },
    {
      totalExpense: 350,
      expenseDate: new Date(2020, 0, 2),
      responsibleMember: 'Tawhidur Rahman',
      totalMeals: 7
    },
    {
      totalExpense: 400,
      expenseDate: new Date(2020, 0, 3),
      responsibleMember: 'Dipu Rana',
      totalMeals: 8
    }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  editMeals(exDate: Date) {
    const dateString = exDate.getFullYear() + '-' + exDate.getMonth() + '-' + exDate.getDate();
    this.router.navigate(['daily-expenses', 'edit-meals', dateString]);
  }


}
