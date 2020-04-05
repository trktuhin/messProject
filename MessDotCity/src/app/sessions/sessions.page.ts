import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionInfo } from '../_models/sessionInfo';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  messname = '';
  sessions: SessionInfo[] = [
    {
      sessionId: 1,
      sessionName: 'January 2020',
      sessionStart: new Date(2020, 0, 1),
      sessionEnd: new Date(2020, 0, 31)
    },
    {
      sessionId: 2,
      sessionName: 'February 2020',
      sessionStart: new Date(2020, 1, 1),
      sessionEnd: new Date(2020, 1, 28)
    }
  ];
  constructor(private route: ActivatedRoute, private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.messname = params.get('messname');
    });
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
            this.toastCtrl.create({
              message:'Message result from server',
              color: 'danger',
              duration: 2000
            }).then( toastEl => toastEl.present());
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }
}
