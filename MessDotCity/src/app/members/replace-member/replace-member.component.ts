import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MemberInfo } from 'src/app/_models/memberInfo';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-replace-member',
  templateUrl: './replace-member.component.html',
  styleUrls: ['./replace-member.component.scss'],
})
export class ReplaceMemberComponent implements OnInit {
  @Input() selectedwUser: any;
  @Input() members: MemberInfo[];
  replacedMemberId = 0;
  constructor(private modalCtrl: ModalController, private memberService: MembersService) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onReplace() {
    // console.log(this.selectedwUser.userId);
    const model = {
      userId: this.selectedwUser.userId,
      memberId: this.replacedMemberId
    };
    this.memberService.replaceMember(model).subscribe(() => {
      this.modalCtrl.dismiss({message: 'Successfully replaced the member'}, 'success');
    }, err => {
      this.modalCtrl.dismiss({message: err}, 'error');
    });
  }

}
