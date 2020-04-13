import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FixedExpense } from 'src/app/_models/fixedExpense';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.page.html',
  styleUrls: ['./edit-expense.page.scss'],
})
export class EditExpensePage implements OnInit {
  expenseForm: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }
  selectedExpense: FixedExpense;
  ngOnInit() {
    let paramId = 0;
    this.route.paramMap.subscribe(params => {
      paramId = +params.get('id');
    });
    this.selectedExpense = {
      id: paramId,
      expenseName: 'Some title',
      expenseAmount: 1500,
      expenseDate: new Date(),
      remarks: 'some remarks'
    };
    this.createExpenseForm();
  }

  createExpenseForm() {
    this.expenseForm = this.fb.group({
      expenseName: [this.selectedExpense.expenseName, [Validators.required, Validators.maxLength(12)]],
      expenseAmount: [this.selectedExpense.expenseAmount, [Validators.required, Validators.min(0)]],
      expenseDate: [ new Date().toISOString(), [Validators.required]],
      remarks: [this.selectedExpense.remarks, [Validators.required]]
    });
  }

}
