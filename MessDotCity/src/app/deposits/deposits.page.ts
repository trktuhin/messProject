import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { AddWithdrawComponent } from './add-withdraw/add-withdraw.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.page.html',
  styleUrls: ['./deposits.page.scss'],
})
export class DepositsPage implements OnInit {
  depositOverviews = [
    {
      memberId: 1,
      memberName: 'Robin',
      photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/71YqPv%2BaG7L._SL1500_.jpg',
      balance: 1200
    },
    {
      memberId: 2,
      memberName: 'Tanim',
      photoUrl: 'https://i.pinimg.com/originals/0d/0f/08/0d0f0898e1deb1ffce7ad53db8ba4e99.jpg',
      balance: 1300
    },
    {
      memberId: 3,
      memberName: 'Dipu',
      photoUrl: 'https://www.facemama.com/wp-content/uploads/2012/10/boy-con-lentes-514x342.jpg',
      balance: 300
    }
  ];
  messname = '';
  backButtonSubscription: Subscription;
  constructor(private route: ActivatedRoute, private modalCtrl: ModalController, 
              private platform: Platform) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.messname = params.get('messname');
    });
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


  getTotalBalance() {
    let sum = 0;
    this.depositOverviews.forEach(element => {
      sum += element.balance;
    });
    return sum;
  }

  openModal(depoType: string, id: number) {
    this.modalCtrl.create({ component: AddWithdrawComponent, componentProps: {
      depositType: depoType,
      selectedMemberId: id
    } }).then(el => {
      el.present();
      return el.onDidDismiss();
    }).then(resultData => {

    });
  }

}
