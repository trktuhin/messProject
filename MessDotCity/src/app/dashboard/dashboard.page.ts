import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { MemberInfo } from '../_models/memberInfo';
import { MemberForSummary } from '../_models/memberForSummary';
import { Platform, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DepositInfo } from '../_models/depositInfo';
import { DepositService } from '../_services/deposit.service';
import { MembersService } from '../_services/members.service';
import { environment } from 'src/environments/environment';
import { ExpenseService } from '../_services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedSegment = 'summary';
  baseImageUrl = environment.baseImageUrl;
  mealRate = 0;
  otherExpense = 0;
  membersForMeals: MemberInfo[] = [];

  membersSummary: DepositInfo[] = [];
  backButtonSubscription: Subscription;
  constructor(private platform: Platform, private depositService: DepositService,
              private memberService: MembersService,
              private expenseService: ExpenseService,
              private loadingCtrl: LoadingController) { }

  getMembersWithDeposits() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.depositService.getDeposits().subscribe(res => {
      this.membersSummary = res;
      loader.then(el => el.dismiss());
    }, err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
  }

  getMembersForMeals() {
    this.memberService.getMembers().subscribe(res => {
      this.membersForMeals = res;
    }, err => console.log(err));
  }

  getOtherMealRate() {
    this.expenseService.getOtherMealRate().subscribe((res: any) => {
      this.mealRate = res.mealRate;
      this.otherExpense = res.otherExpense;
    }, err => console.log(err));
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      navigator['app'].exitApp();
    });
    this.getMembersWithDeposits();
    this.getMembersForMeals();
    this.getOtherMealRate()
   }

   ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
   }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.selectedSegment = event.detail.value;
  }

  totalBfCount() {
    let bf = 0;
    this.membersForMeals.forEach(element => {
      bf = bf + element.dBreakfast;
    });
    return bf;
  }
  totalLchCount() {
    let lch = 0;
    this.membersForMeals.forEach(element => {
      lch = lch + element.dLunch;
    });
    return lch;
  }

  totalDnrCount() {
    let dnr = 0;
    this.membersForMeals.forEach(element => {
      dnr = dnr + element.dDinner;
    });
    return dnr;
  }
}
