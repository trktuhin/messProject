import { Component, OnInit } from '@angular/core';
import { MemberInfo } from 'src/app/_models/memberInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'src/app/_services/members.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { EditMemberComponent } from '../edit-member/edit-member.component';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
})
export class MemberDetailsPage implements OnInit {
  selectedMember: MemberInfo;
  memberId: number;
  isManager = false;

  constructor(private route: ActivatedRoute, private memberService: MembersService,
              private authservice: AuthService,
              private router: Router,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  ownMembership() {
    let memberUserId = '';
    if (this.selectedMember) {
      memberUserId = this.selectedMember.userId;
    }
    const userId = this.authservice.decodedToken.nameid;
    if (memberUserId === userId) {
      return true;
    }
    return false;
  }

  isAdmin() {
    return this.authservice.isAdmin();
  }

  changeManager() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: this.selectedMember.firstName + ' will be new manager',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Okay',
          handler: () => {
            this.memberService.makeManager(this.memberId).subscribe(() => {
              this.showSuccessMessage('New manager made successfully');
              this.getSelectedMember();
            }, err => {
              this.showErrorMessage(err);
            });
          }
        }
      ]
    }).then(el => el.present());
  }

  removeManagerShip() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: this.selectedMember.firstName + ' will be no longer a manager',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Okay',
          handler: () => {
            this.memberService.deleteManagership(this.memberId).subscribe(() => {
              this.showSuccessMessage('Managership removed succssfully');
              this.getSelectedMember();
            }, err => {
              this.showErrorMessage(err);
            });
          }
        }
      ]
    }).then(el => el.present());
  }

  isManualMember() {
    let memberUserId: string;
    if (this.selectedMember) {
      memberUserId = this.selectedMember.userId;
    }
    if (memberUserId) {
      return false;
    }
    return true;
  }
  getSelectedMember() {
    this.route.paramMap.subscribe(params => {
      this.memberId = +params.get('memberId');
      this.memberService.getMember(this.memberId).subscribe(res => {
        this.selectedMember = res;
        if (res.messRole === 'manager') {
          this.isManager = true;
        } else {
          this.isManager = false;
        }
      }, err => console.log(err));
    });
  }
  ionViewWillEnter() {
    this.getSelectedMember();
  }

  deleteMembership() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Your membership will be removed from this mess',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirm',
          handler: () => {
            this.memberService.deleteMembership(this.memberId).subscribe(() => {
              this.router.navigate(['create-mess']);
            }, err => console.log(err));
          }
        }
      ]
    }).then(el => el.present());
  }

  showSuccessMessage(successMessage: string) {
    this.toastCtrl.create({
      message: successMessage,
      duration: 2000,
      color: 'success'
    }).then(el => el.present());
  }

  showErrorMessage(successMessage: string) {
    this.toastCtrl.create({
      message: successMessage,
      duration: 2000,
      color: 'danger'
    }).then(el => el.present());
  }
  onEditMember() {
    this.modalCtrl.create({component: EditMemberComponent,
      componentProps: { selectedMember: this.selectedMember, memberId: this.memberId }}).then(el => {
      el.present();
      return el.onDidDismiss();
    }).then(resultData => {
      if (resultData.role === 'success') {
        this.toastCtrl.create({
          message: resultData.data.message,
          duration: 2000,
          color: 'success'
        }).then(el => {
          el.present();
          this.getSelectedMember();
        });
      } else {
        this.toastCtrl.create({
          message: resultData.data.message,
          duration: 2000,
          color: 'danger'
        }).then(el => {
          el.present();
        });
      }
    });
  }

}
