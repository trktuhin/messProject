import { Component, OnInit } from '@angular/core';
import { DailyExpense } from 'src/app/_models/dailyExpense';

@Component({
  selector: 'app-add-daily-expense',
  templateUrl: './add-daily-expense.page.html',
  styleUrls: ['./add-daily-expense.page.scss'],
})
export class AddDailyExpensePage implements OnInit {
  dailyExpense: DailyExpense = {
    expenseDate: new Date().toISOString(),
    totalExpense: 1200,
    responsiblePerson: '',
    meals: [
      {
        memberId: 1,
        memberName: 'Robin Khan',
        breakfast: 0,
        lunch: 1,
        dinner: 1,
        photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/71YqPv%2BaG7L._SL1500_.jpg'
      },
      {
        memberId: 1,
        memberName: 'Tawhidur Rahman',
        breakfast: 1,
        lunch: 1,
        dinner: 1,
        photoUrl: 'https://i.pinimg.com/originals/0d/0f/08/0d0f0898e1deb1ffce7ad53db8ba4e99.jpg'
      },
      {
        memberId: 1,
        memberName: 'Dipu Rana',
        breakfast: 1,
        lunch: 1,
        dinner: 0,
        photoUrl: 'https://www.facemama.com/wp-content/uploads/2012/10/boy-con-lentes-514x342.jpg'
      }
    ]
  };
  constructor() { }

  ngOnInit() {
  }

  getTotalMeals() {
    let sum = 0;
    this.dailyExpense.meals.forEach(element => {
      sum += +element.breakfast;
      sum += +element.lunch;
      sum += +element.dinner;
    });
    return sum;
  }

}
