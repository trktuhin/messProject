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

  getMember(id: number) {
    return this.http.get<MemberInfo>(this.baseUrl + id).pipe(map((value) => {
      const member = value;
      if (member.photoName) {
        member.photoName = environment.baseImageUrl + member.photoName;
      } else {
        member.photoName = environment.baseImageUrl + 'user.jpg';
      }
      return member;
    }));
  }

  addMember(model: any) {
    return this.http.post(this.baseUrl + 'addMember', model);
  }

  deleteMember(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  approveNewRequest(userId: string) {
    return this.http.post(this.baseUrl + 'approveRequest/' + userId, {});
  }

  sendMemberRequest(model: any) {
    return this.http.post(this.baseUrl + 'addRequest', model);
  }

  getMemberRequests() {
    return this.http.get<any[]>(this.baseUrl + 'getRequests');
  }

  replaceMember(model: any) {
    return this.http.post(this.baseUrl + 'replaceMember', model);
  }
  deleteMembership(id: number) {
    return this.http.delete(this.baseUrl + 'deleteMembership/' + id);
  }

  editMember(model: any) {
    return this.http.post(this.baseUrl + 'EditMember', model);
  }

  viewMeals(memberId: number) {
    return this.http.get(this.baseUrl + 'ViewMeals/' + memberId + '?sessionId=1');
  }
}
