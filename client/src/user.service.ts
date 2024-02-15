import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import Profile from 'src/app/model/profile';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

const inspectUserUrl = 'http://localhost:3000/api/user/';
const duelUsersUrl = 'http://localhost:3000/api/users?';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        "Backend returned code ${error.status}, body was: ", error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  inspectUser(username = 'andrew') {
    let data: Profile = {
      username: "",
        name: "",
        location: "",
        bio: "",
        "avatar-url": "",
        titles: [],
        "favorite-language": "",
        "public-repos": NaN,
        "total-stars": NaN,
        "highest-starred": NaN,
        "perfect-repos": NaN,
        followers: NaN,
        following: NaN
    };
    return this.http
    .get<Profile>(inspectUserUrl + username)
    .pipe(
      map((res : any) => {
        data.username = res.name
        data.name = res.name
        data.location = res.location
        data.bio = res.bio
        data["avatar-url"] = res['avatar-url']
        data.titles = res.titles
        data["favorite-language"] = res['favorite-language']
        data["public-repos"] = res['public-repos']
        data["total-stars"] = res['total-stars']
        data["highest-starred"] = res['highest-starred']
        data["perfect-repos"] = res['perfect-repos']
        data.followers = res.followers
        data.following = res.following
        return data;
      }))
    ;
  }

  duelUsers(user1 = 'fabpot', user2 = 'andrew') {
    let a = this.inspectUser(user1);
    let b = this.inspectUser(user2);
    return [a, b];
  }

}
