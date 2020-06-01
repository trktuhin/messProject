import { Component, OnInit, Input } from '@angular/core';
import { MemberInfo } from 'src/app/_models/memberInfo';
import { ModalController } from '@ionic/angular';
import { MembersService } from 'src/app/_services/members.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss'],
})
export class EditMemberComponent implements OnInit {
  @Input() selectedMember: MemberInfo;
  @Input() memberId: number;
  memberForm: FormGroup;

  constructor(private modalCtrl: ModalController, private memberService: MembersService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createMemberForm();
  }

  createMemberForm() {
    this.memberForm = this.fb.group({
      firstName: [this.selectedMember.firstName, [Validators.required, Validators.maxLength(10)]],
      lastName: [this.selectedMember.lastName, [Validators.required, Validators.maxLength(12)]],
      dBreakfast: [this.selectedMember.dBreakfast, [Validators.required]],
      dLunch: [this.selectedMember.dLunch, [Validators.required]],
      dDinner: [this.selectedMember.dDinner, [Validators.required]]
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
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

  onSubmit() {
    const model = {
      id: this.memberId,
      firstName: this.memberForm.get('firstName').value,
      lastName: this.memberForm.get('lastName').value,
      dBreakfast: this.memberForm.get('dBreakfast').value,
      dLunch: this.memberForm.get('dLunch').value,
      dDinner: this.memberForm.get('dDinner').value
    };
    this.memberService.editMember(model).subscribe(() => {
      this.modalCtrl.dismiss({message: 'Member updated successfully'}, 'success');
    }, err => {
      this.modalCtrl.dismiss({message: err}, 'error');
    });
  }
}
