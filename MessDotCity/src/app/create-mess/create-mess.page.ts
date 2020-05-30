import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessService } from '../_services/mess.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-create-mess',
  templateUrl: './create-mess.page.html',
  styleUrls: ['./create-mess.page.scss'],
})
export class CreateMessPage implements OnInit {
  messForm: FormGroup;
  joinMessForm = {
    messName: '',
    secretCode: ''
  };
  selectedSegment = 'create-mess';
  constructor(private fb: FormBuilder,
              private messService: MessService,
              private authService: AuthService,
              private toastCtrl: ToastController,
              private router: Router,
              private memberService: MembersService) { }

  ngOnInit() {
    this.createmessForm();
  }

  createmessForm() {
    this.messForm = this.fb.group({
      messName: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      updateFrom: [null, [Validators.required]],
      updateTo: [null, [Validators.required]],
      secretCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      selfMember: [true]
    }, {
      validators: [this.updateTimeValidator, this.messNameValidator, this.secretCodeValidator]
    });
  }

  SendRequest() {
    this.memberService.sendMemberRequest(this.joinMessForm).subscribe(res => {
      console.log('Sent request');
    }, err => console.log(err));
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.selectedSegment = event.detail.value;
  }

  createMess() {
    const model = {
      messName: this.messForm.get('messName').value,
      location: this.messForm.get('location').value,
      MealChangeFrom: this.messForm.get('updateFrom').value,
      MealChangeTo: this.messForm.get('updateTo').value,
      secretCode: this.messForm.get('secretCode').value
    };
    this.messService.createMess(model).subscribe(() => {
      localStorage.setItem('messName', model.messName);
      this.authService.changeMessName(model.messName);
      this.router.navigate(['dashboard']);
    }, err => {
      this.toastCtrl.create({
        message: err,
        duration: 2000,
        color: 'danger'
      }).then(el => el.present());
    });
  }

  updateTimeValidator(g: FormGroup) {
    return g.get('updateFrom').value < g.get('updateTo').value ? null : { timeInvalid: true };
  }

  messNameValidator(g: FormGroup) {
    return (/^[a-zA-Z0-9]*$/.test(g.get('messName').value.toString())) ? null : { whiteSpaceName: true };
  }

  secretCodeValidator(g: FormGroup) {
    return (/^[a-zA-Z0-9]*$/.test(g.get('secretCode').value.toString())) ? null : { whiteSpaceCode: true };
  }
}
