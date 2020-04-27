import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserInfo } from '../_models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.apiUrl + 'profile';

constructor(private http: HttpClient) { }

getProfileInfo(): Observable<UserInfo> {
  return this.http.get<UserInfo>(this.baseUrl);
}

}
