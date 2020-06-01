import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { MemberInfo } from '../_models/memberInfo';
import { MemberForSummary } from '../_models/memberForSummary';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedSegment = 'summary';
  mealRate = 50.45;
  otherExpense = 125.35;
  membersForMeals: MemberInfo[] = [
    {
      firstName: 'Robin',
      lastName: 'Khan',
      dBreakfast: 0,
      dLunch: 1,
      dDinner: 1,
      id: 1,
      userId: '2',
      // tslint:disable-next-line: max-line-length
      photoName: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'
    },
    {
      firstName: 'Imran',
      lastName: 'Uddin',
      dBreakfast: 0,
      dLunch: 1,
      dDinner: 1,
      id: 2,
      userId:'2',
      photoName: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
    },
    {
      firstName: 'Dipu',
      lastName: 'Rana',
      dBreakfast: 0,
      dLunch: 1,
      dDinner: 1,
      id: 3,
      userId: '2',
      photoName: 'https://i.pinimg.com/originals/6d/62/f0/6d62f0fb9edea6121981088f95ef5e53.jpg'
    }
  ];

  membersSummary: MemberForSummary[] = [
    {
      memberId: 1,
      firstName: 'Robin',
      lastName: 'Khan',
      deposit: 2500,
      totalMeal: 46,
      photoUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      userId: 1
    },
    {
      memberId: 2,
      firstName: 'Imran',
      lastName: 'Uddin',
      deposit: 1800,
      totalMeal: 43,
      photoUrl: 'https://i.pinimg.com/originals/6d/62/f0/6d62f0fb9edea6121981088f95ef5e53.jpg',
      userId: 1
    },
    {
      memberId: 3,
      firstName: 'Dipu',
      lastName: 'Rana',
      deposit: 2200,
      totalMeal: 36,
      // tslint:disable-next-line: max-line-length
      photoUrl: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg',
      userId: 1
    }
  ];
  backButtonSubscription: Subscription;
  constructor(private platform: Platform) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      navigator['app'].exitApp();
    });
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
