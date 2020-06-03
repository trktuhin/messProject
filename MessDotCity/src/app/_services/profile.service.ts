import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserInfo } from '../_models/userInfo';
import { SessionInfo } from '../_models/sessionInfo';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.apiUrl + 'profile/';

  constructor(private http: HttpClient) { }

  getProfileInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.baseUrl);
  }

  editProfileInfo(model: FormData) {
    return this.http.post(this.baseUrl + 'EditProfile', model);
  }

  addSession(model: any) {
    return this.http.post(this.baseUrl + 'AddSession', model);
  }

  updateSession(model: any) {
    return this.http.put(this.baseUrl + 'UpdateSession', model);
  }

  getSessions() {
    return this.http.get<SessionInfo[]>(this.baseUrl + 'GetSessions');
  }

  getSession(id: number) {
    return this.http.get<SessionInfo>(this.baseUrl + 'GetSession/' + id);
  }

  deleteSession(id: number) {
    return this.http.delete<SessionInfo>(this.baseUrl + 'DeleteSession/' + id);
  }

}
