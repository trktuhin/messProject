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
  messName: string;

  public memberNav = [];

  public appPages = [];

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
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  setMessNameAndSideMenu() {
    const messName = localStorage.getItem('messName');
    this.authService.changeMessName(messName);
    // subscribing to messname
    this.authService.currentMessName.subscribe(mess => {
      this.messName = mess;
      let messRole = '';
      if (this.authService.decodedToken) {
        messRole = this.authService.decodedToken.messRole;
      }
      // console.log(this.messName);
      if (this.messName) {
        this.memberNav = [{
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
        }];
        this.appPages = [];
      } else {
        this.memberNav = [];
        this.appPages = [
          {
            title: 'Create Mess',
            url: '/create-mess',
            icon: 'add-circle'
          },
          {
            title: 'Visit Anonymously',
            url: '/visit',
            icon: 'skull'
          }
        ];
      }
      if (this.messName !== null && messRole === 'admin') {
        this.appPages = [
          {
            title: 'Update Mess',
            url: '/update-mess',
            icon: 'grid'
          },
          {
            title: 'Visit Anonymously',
            url: '/visit',
            icon: 'skull'
          }
        ];
      }
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.authService.currentPhotoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
      // this.setMessNameAndSideMenu();
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeProfilePhoto(user.photoUrl);
    }
    this.authService.openTokenConnection();
    // this.setMessNameAndSideMenu();
    this.authService.currentToken.subscribe(() => {
      this.setMessNameAndSideMenu();
    });
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
