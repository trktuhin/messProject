import { Component, OnInit } from '@angular/core';
import { DailyExpense } from 'src/app/_models/dailyExpense';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/_services/expense.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-meals',
  templateUrl: './edit-meals.page.html',
  styleUrls: ['./edit-meals.page.scss'],
})
export class EditMealsPage implements OnInit {
  dailyExpense: DailyExpense;
  membermeals: any[] = [];
  baseImageUrl = environment.baseImageUrl;
  constructor(private route: ActivatedRoute, private expenseService: ExpenseService,
              public authService: AuthService,
              private alertctrl: AlertController,
              private router: Router) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    let id: number;
    this.route.paramMap.subscribe(params => {
      id = +params.get('id');
    });
    this.expenseService.getSingleExpense(id).subscribe((data: any) => {
      this.dailyExpense = data.expense;
      this.membermeals = data.memberMeals;
    });
  }

  getTotalMeals() {
    let sum = 0;
    this.membermeals.forEach(element => {
      sum += +element.breakfast;
      sum += +element.lunch;
      sum += +element.dinner;
    });
    return sum;
  }

  onSubmit() {
    const model = {
      dailyExpense: this.dailyExpense,
      memberMealResources: this.membermeals
    };
    this.expenseService.editDailyExpense(model).subscribe(() => {
      this.router.navigate(['daily-expenses']);
    }, err => console.log(err));
  }

  onDeleteExpense() {
    this.alertctrl.create({
      header: 'Are you sure to delete this expese?',
      message: 'All data related to the expense will be gone',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.expenseService.deleteDailyExpense(this.dailyExpense.id).subscribe(() => {
              this.router.navigate(['daily-expenses']);
            }, err => console.log(err));
          }
        }
      ]
    }).then(el => el.present());
  }
}
