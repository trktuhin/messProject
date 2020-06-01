import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembersPageRoutingModule } from './members-routing.module';

import { MembersPage } from './members.page';
import { ReplaceMemberComponent } from './replace-member/replace-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MembersPageRoutingModule
  ],
  declarations: [MembersPage, ReplaceMemberComponent, EditMemberComponent],
  entryComponents: [ReplaceMemberComponent, EditMemberComponent]
})
export class MembersPageModule {}
