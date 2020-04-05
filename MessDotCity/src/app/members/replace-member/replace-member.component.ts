import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-replace-member',
  templateUrl: './replace-member.component.html',
  styleUrls: ['./replace-member.component.scss'],
})
export class ReplaceMemberComponent implements OnInit {
  @Input() selectedwUser: any;
  replacedMemberId = 0;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onReplace() {
    // get the replacedmemberId and then replace it with the selectedUser
    // then dismiss the modal throwing either success or error message
    this.modalCtrl.dismiss({message: 'Successfully replaced the member'}, 'success');
  }

}
