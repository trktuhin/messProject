import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionInfo } from 'src/app/_models/sessionInfo';
import { ProfileService } from 'src/app/_services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.page.html',
  styleUrls: ['./add-session.page.scss'],
})
export class AddSessionPage implements OnInit {
  sessionForm: FormGroup;
  constructor(private fb: FormBuilder, private profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    this.createSessionForm();
  }

  createSessionForm() {
    this.sessionForm = this.fb.group({
      sessionName: ['', [Validators.required, Validators.maxLength(15)]],
      sessionStart: [new Date().toISOString(), [Validators.required]],
      sessionEnd: ['', [Validators.required]]
    });
  }

  addSession() {
    const model: SessionInfo = {
      title: this.sessionForm.get('sessionName').value,
      sessionStart: this.sessionForm.get('sessionStart').value,
      sessionEnd: this.sessionForm.get('sessionEnd').value
    };
    this.profileService.addSession(model).subscribe(() => {
      this.router.navigate(['sessions']);
    }, err => console.log(err));
  }

}
