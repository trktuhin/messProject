import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-meals',
  templateUrl: './view-meals.page.html',
  styleUrls: ['./view-meals.page.scss'],
})
export class ViewMealsPage implements OnInit {
  totalBreakfast = 0;
  totalLunch = 0;
  totalDinner = 0;
  totalMeals = 0;
  mealsForMember = [];

  constructor() { }

  ngOnInit() {
    this.mealsForMember = [
      {
        date: new Date(2020, 0, 1, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 2, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 3, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 2
      },
      {
        date: new Date(2020, 0, 4, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 0,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 5, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 0,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 6, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 7, 10, 33, 30, 0),
        breakfast: 1,
        lunch: 2,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 8, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 9, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 10, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 11, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 12, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 13, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 14, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 15, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 16, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 17, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 18, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      },
      {
        date: new Date(2020, 0, 19, 10, 33, 30, 0),
        breakfast: 0,
        lunch: 1,
        dinner: 1
      }
    ];
    this.totalBreakfast = this.getTotalBreakfast();
    this.totalLunch = this.getTotalLunch();
    this.totalDinner = this.getTotalDinner();
    this.totalMeals = this.totalBreakfast + this.totalLunch + this.totalDinner;
  }

  getTotalBreakfast() {
    let b = 0;
    this.mealsForMember.forEach(element => {
      b += element.breakfast;
    });
    return b;
  }

  getTotalLunch() {
    let l = 0;
    this.mealsForMember.forEach(element => {
      l += element.lunch;
    });
    return l;
  }

  getTotalDinner() {
    let d = 0;
    this.mealsForMember.forEach(element => {
      d += element.dinner;
    });
    return d;
  }
}
