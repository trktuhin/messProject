import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  photoUrl: string;

  public memberNav = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Members',
      url: '/members',
      icon: 'people'
    },
    {
      title: 'Daily Expenses',
      url: '/daily-expenses',
      icon: 'receipt'
    },
    {
      title: 'Fixed Expenses',
      url: '/fixed-expenses',
      icon: 'reader'
    },
    {
      title: 'Sessions',
      url: '/sessions',
      icon: 'calendar'
    },
    {
      title: 'Deposits',
      url: '/deposits',
      icon: 'cash'
    },
    {
      title: 'Notices',
      url: '/notices',
      icon: 'chatbubble-ellipses'
    }
  ];

  public appPages = [];

  public anonymousPage = [
    {
      title: 'Visit Anonymously',
      url: '/visit',
      icon: 'skull'
    },
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
  jwtHelper = new JwtHelperService();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
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
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    const token = localStorage.getItem('token');
    const messName = localStorage.getItem('messName');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeProfilePhoto(user.photoUrl);
      this.authService.messName = messName;
    }
    if (messName) {
      this.appPages.unshift({
        title: 'Update Mess',
        url: '/update-mess',
        icon: 'grid'
      });
    } else {
      this.appPages.unshift({
        title: 'Update Mess',
        url: '/update-mess',
        icon: 'grid'
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
  gotoProfile() {
    this.router.navigate(['profile']);
    this.menuCtrl.close('m1');
  }
}
