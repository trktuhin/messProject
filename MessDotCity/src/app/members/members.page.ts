import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { ModalController, ToastController, AlertController, Platform } from '@ionic/angular';
import { ReplaceMemberComponent } from './replace-member/replace-member.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  selectedSegment = 'members';
  members = [
    {
      memberId: 1,
      firstName: 'Robin',
      lastName: 'Khan',
      photoUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      userId: 1,
      mobile: '01677048891',
      profession: 'Engineer'
    },
    {
      memberId: 2,
      firstName: 'Imran',
      lastName: 'Uddin',
      photoUrl: 'https://i.pinimg.com/originals/6d/62/f0/6d62f0fb9edea6121981088f95ef5e53.jpg',
      userId: 1,
      mobile: '01677048892',
      profession: 'Student'
    },
    {
      memberId: 3,
      firstName: 'Dipu',
      lastName: 'Rana',
      // tslint:disable-next-line: max-line-length
      photoUrl: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg',
      userId: 1,
      mobile: '01677048893',
      profession: 'Business-man'
    }
  ];

  requests = [
    {
      requestId: 1,
      firstName: 'John',
      lastName: 'Abraham',
      photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/71YqPv%2BaG7L._SL1500_.jpg',
      userId: 1,
      mobile: '01677048891'
    },
    {
      requestId: 2,
      firstName: 'John',
      lastName: 'Cuttler',
      photoUrl: 'https://www.facemama.com/wp-content/uploads/2012/10/boy-con-lentes-514x342.jpg',
      userId: 1,
      mobile: '01677048892'
    },
    {
      requestId: 3,
      firstName: 'John',
      lastName: 'Wick',
      photoUrl: 'https://i.pinimg.com/originals/0d/0f/08/0d0f0898e1deb1ffce7ad53db8ba4e99.jpg',
      userId: 1,
      mobile: '01677048893'
    }
  ];
  backButtonSubscription: Subscription;
  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private router: Router,
              private platform: Platform) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    // console.log('from will enter');
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      navigator['app'].exitApp();
    });
   }

   ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
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
            // call service method
            this.toastCtrl.create({
                message: 'Result message from the server',
                duration: 2000,
                color: 'success'
            }).then(el => el.present());
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

}
