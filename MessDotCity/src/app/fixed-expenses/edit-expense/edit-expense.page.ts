import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FixedExpense } from 'src/app/_models/fixedExpense';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/_services/expense.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.page.html',
  styleUrls: ['./edit-expense.page.scss'],
})
export class EditExpensePage implements OnInit {
  expenseForm: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private expenseService: ExpenseService,
              private router: Router,
              public authService: AuthService) { }
  selectedExpense: FixedExpense;
  ngOnInit() {
  }

  ionViewWillEnter() {
    let paramId = 0;
    this.route.paramMap.subscribe(params => {
      paramId = +params.get('id');
    });
    this.expenseService.getFixedExpense(paramId).subscribe(res => {
      this.selectedExpense = res;
      this.createExpenseForm();
    });
  }

  createExpenseForm() {
    this.expenseForm = this.fb.group({
      expenseName: [this.selectedExpense.title, [Validators.required, Validators.maxLength(12)]],
      expenseAmount: [this.selectedExpense.amount, [Validators.required, Validators.min(0)]],
      expenseDate: [ this.selectedExpense.effectiveDate, [Validators.required]],
      remarks: [this.selectedExpense.remarks, [Validators.required]]
    });
  }

  onSubmit() {
    const model: FixedExpense = {
      id: this.selectedExpense.id,
      title: this.expenseForm.get('expenseName').value,
      amount: this.expenseForm.get('expenseAmount').value,
      effectiveDate: this.expenseForm.get('expenseDate').value,
      remarks: this.expenseForm.get('remarks').value,
    };
    this.expenseService.updateFixedExpense(model).subscribe(() => {
      this.router.navigate(['fixed-expenses']);
    }, err => console.log(err));
  }

}
