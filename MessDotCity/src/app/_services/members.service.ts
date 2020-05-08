import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberInfo } from '../_models/memberInfo';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl + 'members/';
  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<MemberInfo[]>(this.baseUrl).pipe(map((value) => {
      const originalMembers = value;
      originalMembers.forEach(element => {
        if(element.photoName) {
          element.photoName = environment.baseImageUrl + element.photoName;
        } else {
          element.photoName = environment.baseImageUrl + 'user.jpg';
        }
      });
      return originalMembers;
    }));
  }

  addMember(model: any) {
    return this.http.post(this.baseUrl + 'addMember', model);
  }

}
