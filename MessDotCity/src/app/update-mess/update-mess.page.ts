import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessService } from '../_services/mess.service';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-mess',
  templateUrl: './update-mess.page.html',
  styleUrls: ['./update-mess.page.scss'],
})
export class UpdateMessPage implements OnInit {
  messForm: FormGroup;

  constructor(private fb: FormBuilder, private messService: MessService,
              private toastCtrl: ToastController,
              private authService: AuthService,
              private alertCtrl: AlertController,
              private router: Router)
             { }

  ngOnInit() {
    this.createmessForm();
  }
  ionViewWillEnter() {
    this.messService.getMess().subscribe(res => {
      this.messForm.patchValue({
        messName: res.messName,
        location: res.location,
        updateFrom: res.mealChangeFrom,
        updateTo: res.mealChangeTo,
        secretCode: res.secretCode
      });
    });
  }

  createmessForm() {
    this.messForm = this.fb.group({
      messName: [''],
      location: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      updateFrom: [new Date().toISOString(), [Validators.required]],
      updateTo: [ new Date().toISOString(), [Validators.required]],
      secretCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    }, {
      validators: [this.secretCodeValidator]
    });
  }

  updateTimeValidator(g: FormGroup) {
    return g.get('updateFrom').value < g.get('updateTo').value ? null : {timeInvalid: true};
  }

  secretCodeValidator(g: FormGroup) {
    return (/^[a-zA-Z0-9]*$/.test(g.get('secretCode').value.toString())) ? null : {whiteSpaceCode: true};
  }

  updateMess() {
    const model = {
      location: this.messForm.get('location').value,
      mealChangeFrom: this.messForm.get('updateFrom').value,
      mealChangeTo: this.messForm.get('updateTo').value,
      secretCode: this.messForm.get('secretCode').value
    };

    this.messService.updateMess(model).subscribe(res => {
      this.toastCtrl.create({
        message: 'Mess updated successfully',
        duration: 2000,
        color: 'success'
    }).then(el => el.present());
    }, err => console.log(err));
  }

  deleteMess() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Your mess will be permanently deleted',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirm',
          handler: () => {
            this.messService.deleteMess().subscribe(() => {
              this.toastCtrl.create({
                message: 'Mess was deleted successfully',
                duration: 2000,
                color: 'success'
            }).then(el => el.present());
              localStorage.removeItem('messName');
              this.authService.changeMessName('');
              this.router.navigate(['create-mess']);
            }, err => console.log(err));
          }
        }
      ]
    }).then(el => el.present());
  }

}
