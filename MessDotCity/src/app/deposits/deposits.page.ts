import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController, LoadingController } from '@ionic/angular';
import { AddWithdrawComponent } from './add-withdraw/add-withdraw.component';
import { DepositInfo } from '../_models/depositInfo';
import { DepositService } from '../_services/deposit.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { SessionInfo } from '../_models/sessionInfo';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.page.html',
  styleUrls: ['./deposits.page.scss'],
})
export class DepositsPage implements OnInit {
  depositOverviews: DepositInfo[] = [];
  baseImageUrl = environment.baseImageUrl;
  memberDropdown: any[];
  sessions: SessionInfo[];
  selectedSessionId = 0;
  constructor(private modalCtrl: ModalController,
              private depositService: DepositService,
              private toasCtrl: ToastController,
              private loadingCtrl: LoadingController,
              public authService: AuthService,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  getSessions() {
    this.profileService.getSessions().subscribe(res => {
      this.sessions = res;
      if (res[0]) {
        this.selectedSessionId = res[0].id;
      }
      this.initializeDeposits();
      this.getMembersForDropdown();
    });
  }

  onSessionChange() {
    this.initializeDeposits();
    this.getMembersForDropdown();
  }

  initializeDeposits() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    this.depositService.getDeposits(this.selectedSessionId).subscribe(res => {
      this.depositOverviews = res;
      loader.then(el => el.dismiss());
    }, err => {
        console.log(err);
        loader.then(el => el.dismiss());
    });
  }

  getMembersForDropdown() {
    this.depositService.getMemberDropdown().subscribe((res: any) => {
      this.memberDropdown = res;
    }, err => console.log(err));
  }

  ionViewWillEnter() {
    this.getSessions();
   }

  getTotalBalance() {
    let totalcredit = 0;
    let totalDebit = 0;
    this.depositOverviews.forEach(element => {
      totalDebit += element.totalDebit;
      totalcredit += element.totalCredit;
    });
    return totalDebit - totalcredit;
  }

  openModal(depoType: string, id: number) {
    this.modalCtrl.create({ component: AddWithdrawComponent, componentProps: {
      depositType: depoType,
      selectedMemberId: id,
      members: this.memberDropdown
    } }).then(el => {
      el.present();
      return el.onDidDismiss();
    }).then(resultData => {
      if (resultData.role === 'success') {
        this.toasCtrl.create({
          message: resultData.data.message,
          duration: 2000,
          color: 'success'
        }).then(el => {
          el.present();
          this.initializeDeposits();
        });
      } else if (resultData.role === 'error') {
        this.toasCtrl.create({
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
