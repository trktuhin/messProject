import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-withdraw',
  templateUrl: './add-withdraw.component.html',
  styleUrls: ['./add-withdraw.component.scss'],
})
export class AddWithdrawComponent implements OnInit {
  @Input() depositType: string;
  @Input() selectedMemberId: number;
  depositForm: FormGroup;
  members = [
    {
      id: 1,
      name: 'Robin Khan'
    },
    {
      id: 2,
      name: 'Tawhidur Rahman'
    },
    {
      id: 3,
      name: 'Dipu Rana'
    }
  ];
  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

  ngOnInit() {
    this.createDepositForm();
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  createDepositForm() {
    this.depositForm = this.fb.group({
      depositType: [this.depositType, [Validators.required]],
      depositAmount: [0, Validators.min(0)],
      depositDate: [ new Date().toISOString(), Validators.required],
      memberId: [ this.selectedMemberId, Validators.required],
      remarks: ['']
    });
  }

}
