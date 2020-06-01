import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  tokenConnection: HubConnection;
  decodedToken: any;
  currentUser: any;
  messName = new BehaviorSubject<string>('');
  token = new BehaviorSubject<string>('');
  memberRequest = new BehaviorSubject<string>('');
  photoUrl = new BehaviorSubject<string>(environment.baseImageUrl + '/user.jpg');
  currentPhotoUrl = this.photoUrl.asObservable();
  currentMessName = this.messName.asObservable();
  currentRequests = this.memberRequest.asObservable();
  currentToken = this.token.asObservable();
  jwtHelper = new JwtHelperService();
  get IsLoggedIn() {
    let result = false;
    const token = localStorage.getItem('token');
    try {
      result = !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      result = false;
    }
    return result;
  }
  haveMess() {
    const messName = localStorage.getItem('messName');
    if (messName) { return true; }
    return false;
  }

  constructor(private http: HttpClient) { }
  changeProfilePhoto(photoName: string) {
    this.photoUrl.next(environment.baseImageUrl + photoName);
  }
  changeMessName(messName: string) {
    this.messName.next(messName);
  }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage.setItem('messName', user.messName);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          localStorage.setItem('nameid', this.decodedToken.nameid);
          if (user.user) {
            this.currentUser = user.user;
            if (this.currentUser.photoUrl) {
              this.changeProfilePhoto(this.currentUser.photoUrl);
            }
            this.changeMessName(user.messName);
          }

          // opening token connection
          this.openTokenConnection();
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('messName');
    localStorage.removeItem('nameid');
    this.tokenConnection.stop();
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model).pipe(
      map(res => {
        // console.log(res);
      })
    );
  }

  openTokenConnection() {
    const username = localStorage.getItem('nameid');
    if (username === null) {
      console.log('not logged in');
      return;
    }
    this.tokenConnection = new HubConnectionBuilder().configureLogging(signalR.LogLevel.Debug)
    .withUrl('http://localhost:5000/tokenUpdate?username=' + username, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();
    this.tokenConnection.start().then(() => {
      // new token receive event
      this.tokenConnection.on('ReceiveToken', obj => {
        localStorage.setItem('token', obj.token);
        // setting decoded token
        this.decodedToken = this.jwtHelper.decodeToken(obj.token);

        localStorage.setItem('messName', obj.messName);
        this.token.next(obj.token);
      });

      // new member request receive event
      this.tokenConnection.on('ReceiveRequest', data => {
        this.memberRequest.next(data);
      });
    });
  }

  isAdmin() {
    const role = this.decodedToken.messRole;
    if ((role as string).toLowerCase() === 'admin') {
      return true;
    }
    return false;
  }
}
