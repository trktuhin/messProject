import { Component, OnInit } from '@angular/core';
import { DailyExpense } from 'src/app/_models/dailyExpense';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-meals',
  templateUrl: './edit-meals.page.html',
  styleUrls: ['./edit-meals.page.scss'],
})
export class EditMealsPage implements OnInit {
  dailyExpense: DailyExpense;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let dateString = '';
    this.route.paramMap.subscribe(params => {
      dateString = params.get('date');
    });
    const datearr = dateString.split('-');
    this.dailyExpense = {
      expenseDate: new Date(+datearr[0], +datearr[1], +datearr[2]).toISOString(),
      totalExpense: 1200,
      responsiblePerson: 'Robin Khan',
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
