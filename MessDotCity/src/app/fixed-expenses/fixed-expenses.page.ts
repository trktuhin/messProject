import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixedExpense } from '../_models/fixedExpense';

@Component({
  selector: 'app-fixed-expenses',
  templateUrl: './fixed-expenses.page.html',
  styleUrls: ['./fixed-expenses.page.scss'],
})
export class FixedExpensesPage implements OnInit {
  messname = '';
  totalMembers = 3;
  fixedExpenses: FixedExpense[] = [];
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.messname = params.get('messname');
    });

    this.fixedExpenses = [
      {
        id: 1,
        expenseName: 'Moila bill',
        expenseAmount: 350,
        expenseDate: new Date(2020, 0, 3),
        remarks: 'Monthly moila bill'
      },
      {
        id: 2,
        expenseName: 'Electricity bill',
        expenseAmount: 1500,
        expenseDate: new Date(2020, 0, 4),
        remarks: 'Advance electricity bill'
      },
      {
        id: 3,
        expenseName: 'Khala bill',
        expenseAmount: 2000,
        expenseDate: new Date(2020, 0, 3),
        remarks: 'Maid service monthly bill'
      }
    ];
  }

  getPerMemberCost() {
    let sum = 0;
    this.fixedExpenses.forEach(element => {
      sum += element.expenseAmount;
    });
    return sum / this.totalMembers;
  }

  editExpense(id: number) {
    this.router.navigate(['fixed-expenses', this.messname, 'edit-expense', id]);
  }

}
