import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepositService } from 'src/app/_services/deposit.service';

@Component({
  selector: 'app-add-withdraw',
  templateUrl: './add-withdraw.component.html',
  styleUrls: ['./add-withdraw.component.scss'],
})
export class AddWithdrawComponent implements OnInit {
  @Input() depositType: string;
  @Input() selectedMemberId: number;
  @Input() members: any[];
  depositForm: FormGroup;
  constructor(private modalCtrl: ModalController, private fb: FormBuilder,
              private depositService: DepositService) { }

  ngOnInit() {
    this.createDepositForm();
  }

  onCancel() {
    this.modalCtrl.dismiss({message: 'modal closed'}, 'cancel');
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

  addDeposit() {
    const model = {
      amount: this.depositForm.get('depositAmount').value,
      depositType: this.depositForm.get('depositType').value,
      memberId: this.depositForm.get('memberId').value,
      effectiveDate: this.depositForm.get('depositDate').value,
      remarks: this.depositForm.get('remarks').value
    };
    this.depositService.addDeposit(model).subscribe(() => {
      this.modalCtrl.dismiss({message: 'Deposit updated successfully'}, 'success');
    }, err => {
      this.modalCtrl.dismiss({message: err}, 'error');
    });
  }

}
