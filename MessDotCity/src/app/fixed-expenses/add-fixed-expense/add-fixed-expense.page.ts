import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-fixed-expense',
  templateUrl: './add-fixed-expense.page.html',
  styleUrls: ['./add-fixed-expense.page.scss'],
})
export class AddFixedExpensePage implements OnInit {
  expenseForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createExpenseForm();
  }

  createExpenseForm() {
    this.expenseForm = this.fb.group({
      expenseName: ['', [Validators.required]],
      expenseAmount: [0, [Validators.required]],
      expenseDate: [ new Date().toISOString(), [Validators.required]],
      remarks: ['']
    });
  }

}
