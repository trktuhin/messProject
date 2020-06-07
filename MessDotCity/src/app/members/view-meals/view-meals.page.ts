import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SessionInfo } from 'src/app/_models/sessionInfo';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-view-meals',
  templateUrl: './view-meals.page.html',
  styleUrls: ['./view-meals.page.scss'],
})
export class ViewMealsPage implements OnInit {
  memberId: number;
  selectedMember: any;
  meals: any[] = [];
  totalBreakfast = 0;
  totalLunch = 0;
  totalDinner = 0;
  totalMeals = 0;
  sessions: SessionInfo[];
  selectedSessionId = 0;

  constructor(private memberService: MembersService, private route: ActivatedRoute,
              private loadingCtrl: LoadingController,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  getSessions() {
    this.profileService.getSessions().subscribe(res => {
      this.sessions = res;
      if (res[0]) {
        this.selectedSessionId = res[0].id;
      }
      this.getSelectedMember();
      this.getAllMeals();
    });
  }

  onSessionChange() {
    this.getSelectedMember();
    this.getAllMeals();
  }

  calculateTotalMeals() {
    this.totalBreakfast = this.getTotalBreakfast();
    this.totalLunch = this.getTotalLunch();
    this.totalDinner = this.getTotalDinner();
    this.totalMeals = this.totalBreakfast + this.totalLunch + this.totalDinner;
  }

  getSelectedMember() {
    this.route.paramMap.subscribe(params => {
      this.memberId = +params.get('memberId');
      this.memberService.getMember(this.memberId).subscribe(res => {
        this.selectedMember = res;
      }, err => console.log(err));
    });
  }

  getAllMeals() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.memberService.viewMeals(this.memberId, this.selectedSessionId).subscribe((data: any) => {
      this.meals = data;
      this.calculateTotalMeals();
      loader.then(el => el.dismiss());
    }, err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
  }

  ionViewWillEnter() {
    this.getSessions();
  }

  getTotalBreakfast() {
    let b = 0;
    this.meals.forEach(element => {
      b += element.breakFast;
    });
    return b;
  }

  getTotalLunch() {
    let l = 0;
    this.meals.forEach(element => {
      l += element.lunch;
    });
    return l;
  }

  getTotalDinner() {
    let d = 0;
    this.meals.forEach(element => {
      d += element.dinner;
    });
    return d;
  }
}
