import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  memberMessName = 'Your Mess name';

  public memberNav = [
    {
      title: 'Dashboard',
      url: '/dashboard/messname',
      icon: 'home'
    },
    {
      title: 'Members',
      url: '/members/messname',
      icon: 'people'
    },
    {
      title: 'Daily Expenses',
      url: '/expenses/messname',
      icon: 'receipt'
    },
    {
      title: 'Fixed Expenses',
      url: '/fixedexpenses/messname',
      icon: 'reader'
    },
    {
      title: 'Sessions',
      url: '/sessions/demomess',
      icon: 'calendar'
    },
    {
      title: 'Deposits',
      url: '/deposits/messname',
      icon: 'cash'
    },
    {
      title: 'Notices',
      url: '/notices/messname',
      icon: 'chatbubble-ellipses'
    }
  ];

  public appPages = [
    {
      title: 'Create Mess',
      url: '/create-mess',
      icon: 'add-circle'
    },
    {
      title: 'Update Mess',
      url: '/update-mess/messname',
      icon: 'grid'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person-circle'
    },
    {
      title: 'Visit Anonymously',
      url: '/visit',
      icon: 'skull'
    }
  ];

  public anonymousPage = [
    {
      title: 'Sign In / Sign Up',
      url: '/auth',
      icon: 'key'
    },
    {
      title: 'Visit Anonymously',
      url: '/visit',
      icon: 'skull'
    }
  ];
  activePath = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
    // this.router.events.subscribe((event: RouterEvent) => {
    //   this.activePath = event.url;
    //   console.log(this.activePath);
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
