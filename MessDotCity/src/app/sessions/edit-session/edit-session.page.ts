import { Component, OnInit } from '@angular/core';
import { SessionInfo } from 'src/app/_models/sessionInfo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.page.html',
  styleUrls: ['./edit-session.page.scss'],
})
export class EditSessionPage implements OnInit {
  selectedSession: SessionInfo;
  sessionForm: FormGroup;
  constructor(private fb: FormBuilder, private platform: Platform,
              private route: ActivatedRoute,
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    // this.createSessionForm();
  }

  ionViewWillEnter() {
    let paramId = 0;
    this.route.paramMap.subscribe(params => {
      paramId = +params.get('sessionId');
    });
    this.profileService.getSession(paramId).subscribe(res => {
      this.selectedSession = res;
      this.createSessionForm();
    });
  }

  createSessionForm() {
    this.sessionForm = this.fb.group({
      sessionName: [this.selectedSession.title, [Validators.required, Validators.maxLength(15)]],
      sessionStart: [this.selectedSession.sessionStart, [Validators.required]],
      sessionEnd: [this.selectedSession.sessionEnd, [Validators.required]]
    });
  }

  editSession() {
    const model: SessionInfo = {
      id: this.selectedSession.id,
      title: this.sessionForm.get('sessionName').value,
      sessionStart: this.sessionForm.get('sessionStart').value,
      sessionEnd: this.sessionForm.get('sessionEnd').value
    };
    this.profileService.updateSession(model).subscribe(() => {
      this.router.navigate(['sessions']);
    }, err => console.log(err));
  }
}
