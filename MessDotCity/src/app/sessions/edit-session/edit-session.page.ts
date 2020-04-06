import { Component, OnInit } from '@angular/core';
import { SessionInfo } from 'src/app/_models/sessionInfo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.page.html',
  styleUrls: ['./edit-session.page.scss'],
})
export class EditSessionPage implements OnInit {
  selectedSession: SessionInfo;
  sessionForm: FormGroup;
  constructor(private fb: FormBuilder, private vibration: Vibration, private platform: Platform) { }

  ngOnInit() {
    this.selectedSession = {
      sessionId: 1,
      sessionName: 'January 2020',
      sessionStart: new Date(2020, 0, 1),
      sessionEnd: new Date(2020, 0, 31)
    };
    this.createSessionForm();
  }

  createSessionForm() {
    this.sessionForm = this.fb.group({
      sessionName: [this.selectedSession.sessionName, [Validators.required, Validators.maxLength(15)]],
      sessionStart: [this.selectedSession.sessionStart.toISOString(), [Validators.required]],
      sessionEnd: [this.selectedSession.sessionEnd.toISOString(), [Validators.required]]
    });
  }

  doVibrate() {
    if(this.platform.is('android')) {
      this.vibration.vibrate(1000);
    }
  }
}
