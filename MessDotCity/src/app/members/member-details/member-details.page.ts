import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
})
export class MemberDetailsPage implements OnInit {
  selectedMember = {
      memberId: 1,
      firstName: 'Robin',
      lastName: 'Khan',
      photoUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      userId: 1,
      mobile: '01677048891',
      email: 'robinkhantuhin404@gmail.com',
      profession: 'Engineer'
  };

  constructor() { }

  ngOnInit() {
    // get the selected member from member id in the route
  }

}
