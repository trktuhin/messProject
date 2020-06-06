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
import { ProfileService } from '../_services/profile.service';
import { SessionInfo } from '../_models/sessionInfo';

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
  sessions: SessionInfo[];
  selectedSessionId = 0;
  membersSummary: DepositInfo[] = [];
  backButtonSubscription: Subscription;
  constructor(private platform: Platform, private depositService: DepositService,
              private memberService: MembersService,
              private expenseService: ExpenseService,
              private loadingCtrl: LoadingController,
              private profileService: ProfileService) { }

  getSessions() {
    this.profileService.getSessions().subscribe(res => {
      this.sessions = res;
      if (res[0]) {
        this.selectedSessionId = res[0].id;
      }
      this.getMembersWithDeposits();
      this.getMembersForMeals();
      this.getOtherMealRate();
    });
  }

  getMembersWithDeposits() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.depositService.getDeposits(this.selectedSessionId).subscribe(res => {
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
    this.expenseService.getOtherMealRate(this.selectedSessionId).subscribe((res: any) => {
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
    this.getSessions();
   }

   onSessionChange() {
    this.getMembersWithDeposits();
    this.getMembersForMeals();
    this.getOtherMealRate();
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

  getTotalBalance() {
    let totalDebit = 0;
    let totalCredit = 0;
    let totalMeals = 0;
    const totalMember = this.membersForMeals.length;
    this.membersSummary.forEach(element => {
      totalDebit += element.totalDebit;
      totalCredit += element.totalCredit;
      totalMeals += element.totalMeals;
    });
    return (totalDebit - totalCredit) - (totalMeals * this.mealRate + (totalMember * this.otherExpense));
  }
}
