import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionInfo } from '../_models/sessionInfo';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  messname = '';
  sessions: SessionInfo[] = [
    {
      sessionId: 1,
      sessionName: 'January 2020',
      sessionStart: new Date(2020, 0, 1),
      sessionEnd: new Date(2020, 0, 31)
    },
    {
      sessionId: 2,
      sessionName: 'February 2020',
      sessionStart: new Date(2020, 1, 1),
      sessionEnd: new Date(2020, 1, 28)
    }
  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.messname = params.get('messname');
    });
  }

}
