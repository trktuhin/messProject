import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private profileService: ProfileService) { }
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  passwordMissMatch() {
    if (this.newPassword === this.confirmPassword) {
      return false;
    }
    return true;
  }

  ChangePassword() {
    const model = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };
    this.profileService.changePassword(model).subscribe(() => {
      this.modalCtrl.dismiss({message: 'Pasword changed successfully'}, 'success');
    }, err => {
      this.modalCtrl.dismiss({message: err}, 'error');
    });
  }

}
