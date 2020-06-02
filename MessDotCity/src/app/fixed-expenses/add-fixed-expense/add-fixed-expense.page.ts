import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FixedExpense } from 'src/app/_models/fixedExpense';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fixed-expense',
  templateUrl: './add-fixed-expense.page.html',
  styleUrls: ['./add-fixed-expense.page.scss'],
})
export class AddFixedExpensePage implements OnInit {
  expenseForm: FormGroup;
  constructor(private fb: FormBuilder, private expenseService: ExpenseService,
              private router: Router) { }

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

  onSubmit() {
    const model: FixedExpense = {
      title: this.expenseForm.get('expenseName').value,
      amount: this.expenseForm.get('expenseAmount').value,
      effectiveDate: this.expenseForm.get('expenseDate').value,
      remarks: this.expenseForm.get('remarks').value,
    };
    this.expenseService.addFixedExpense(model).subscribe(() => {
      this.router.navigate(['fixed-expenses']);
    }, err => console.log(err));
  }

}
