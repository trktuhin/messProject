import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AssignedDate } from '../_models/assignedDate';
import { SessionInfo } from '../_models/sessionInfo';
import { AssignedDateService } from '../_services/assigned-date.service';
import { AuthService } from '../_services/auth.service';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-assigned-dates',
  templateUrl: './assigned-dates.page.html',
  styleUrls: ['./assigned-dates.page.scss'],
})
export class AssignedDatesPage implements OnInit {
  asssignedDates: AssignedDate[] = [];
  sessions: SessionInfo[];
  selectedSessionId = 0;
  constructor(private assignedDateService: AssignedDateService
              ,private profileService: ProfileService
              ,private loadingCtrl: LoadingController
              ,public authService: AuthService) { }

  ngOnInit() {
  }
  getSessions() {
    this.profileService.getSessions().subscribe(res => {
      this.sessions = res;
      if (res[0]) {
        this.selectedSessionId = res[0].id;
      }
      this.getAssignedDates();
    });
  }

  getAssignedDates() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.assignedDateService.getAssignedDates(this.selectedSessionId).subscribe(res => {
      this.asssignedDates = res;
      loader.then(el => el.dismiss());
    },err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
  }

  ionViewWillEnter() {
    this.getSessions();
  }

  getTotalCount() {
    return this.asssignedDates.length;
  }

  onSessionChange() {
    this.getAssignedDates();
  }

}
