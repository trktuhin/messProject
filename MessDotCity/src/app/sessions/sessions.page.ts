import { Component, OnInit } from '@angular/core';
import { SessionInfo } from '../_models/sessionInfo';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ProfileService } from '../_services/profile.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  sessions: SessionInfo[] = [];
  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private profileService: ProfileService,
              private loadingCtrl: LoadingController,
              public authService: AuthService) { }

  ngOnInit() {
  }

  sessionInitialize() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.profileService.getSessions().subscribe(res => {
      this.sessions = res;
      // console.log(this.sessions);
      loader.then(el => el.dismiss());
    }, err => {
      console.log(err);
      loader.then(el => el.dismiss());
    });
  }

  ionViewWillEnter() {
    this.sessionInitialize();
  }

  onDeleteSession(id: number) {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'The session will be deleted permanently',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.profileService.deleteSession(id).subscribe(() => {
              this.sessionInitialize();
              this.toastCtrl.create({
                message: 'Deleted session successfully',
                color: 'danger',
                duration: 2000
              }).then( toastEl => toastEl.present());
            }, err => console.log(err));
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }
}
