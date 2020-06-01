import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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

  constructor(private memberService: MembersService, private route: ActivatedRoute,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
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

  ionViewWillEnter() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.getSelectedMember();
    this.memberService.viewMeals(this.memberId).subscribe((data: any) => {
      this.meals = data;
      this.calculateTotalMeals();
      loader.then(el => el.dismiss());
    }, err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
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
