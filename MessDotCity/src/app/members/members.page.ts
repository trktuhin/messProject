import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { ModalController, ToastController, AlertController, Platform, LoadingController } from '@ionic/angular';
import { ReplaceMemberComponent } from './replace-member/replace-member.component';
import { Router } from '@angular/router';
import { MembersService } from '../_services/members.service';
import { MemberInfo } from '../_models/memberInfo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  selectedSegment = 'members';
  members: MemberInfo[] = [];

  requests = [];
  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private memberService: MembersService,
              private router: Router,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.memberInitialize();
    this.requestInitialize();
  }
  memberInitialize() {
    this.memberService.getMembers().subscribe(res => {
      this.members = res;
    }, err => {
      console.log(err);
    });
  }

  requestInitialize() {
    // this.loadingCtrl.create().then(el => el.present());
    this.memberService.getMemberRequests().subscribe(res => {
      const reqs = res;
      this.requests = [];
      reqs.forEach(element => {
        if (element.user.photoUrl) {
          element.user.photoUrl = environment.baseImageUrl + element.user.photoUrl;
        } else {
          element.user.photoUrl = environment.baseImageUrl + 'user.jpg';
        }
        this.requests.push(element.user);
        // this.loadingCtrl.dismiss();
      });
    }, err => {
      console.log(err);
      // this.loadingCtrl.dismiss();
    });
  }

  viewMeals(memberId: number) {
    this.router.navigate(['/members/2/view-meals']);
  }

  memberDetails(id: number) {
    this.router.navigate(['members', id]);
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.selectedSegment = event.detail.value;
  }

  replaceMemberModal(user: any) {
    this.modalCtrl.create({ component: ReplaceMemberComponent, componentProps: { selectedwUser: user } }).then(el => {
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
          // initialize the members list
          this.selectedSegment = 'members';
        });
      }
    });

  }

  onNewMember(user: any) {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'A new member will be added',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirm',
          handler: () => {
            this.memberService.approveNewRequest(user.userId).subscribe(res => {
              this.toastCtrl.create({
                message: 'New member added',
                duration: 2000,
                color: 'success'
              }).then(el => el.present());
              this.memberInitialize();
              this.requestInitialize();
              this.selectedSegment = 'members';
            }, err => console.log(err));
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

  onDeleteRequest(user: any) {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'The request will be deleted',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn-secondary',
        },
        {
          text: 'Confirm',
          cssClass: 'btn-primary',
          handler: () => {
            // call service method to delete request
            this.toastCtrl.create({
              message: 'Result message from the server',
              duration: 2000,
              color: 'danger'
            }).then(el => el.present());
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

  onDeleteMember(id: number) {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'The member will be removed',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn-secondary',
        },
        {
          text: 'Confirm',
          cssClass: 'btn-primary',
          handler: () => {
            this.memberService.deleteMember(id).subscribe(() => {
              this.memberInitialize();
              // showing toast
              this.toastCtrl.create({
                message: 'Deleted member successfully',
                duration: 2000,
                color: 'danger'
              }).then(el => el.present());
            }, err => console.log(err));
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

}
