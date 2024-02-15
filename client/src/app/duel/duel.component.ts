import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import Profile from 'src/app/model/profile';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  onSubmit() {
    let observables : Observable<Profile>[] = this.userService.duelUsers(this.usernameOne, this.usernameTwo);
    let profile1 = document.getElementById("profile1")!;
    let profile2 = document.getElementById("profile2")!;
    let checkbox1 = document.getElementById("checkbox1");
    let checkbox2 = document.getElementById("checkbox2");
    let data1 = "";
    let data2 = "";
    profile1.innerHTML = "";
    profile2.innerHTML = "";
    checkbox1!.innerHTML = "";
    checkbox2!.innerHTML = "";
    observables[0].subscribe((res1 : Profile) => {
      data1 += "<p>Name: " + res1.name + "</p>";
      data1 += "<p>Username: " + res1.username + "</p>";
      data1 += "<p>Location: " + res1.location + "</p>";
      data1 += "<p>Bio: " + res1.bio + "</p>";
      data1 += "<p>Titles: " + res1.titles + "</p>";
      data1 += "<p>Favorite Language: " + res1['favorite-language'] + "</p>";
      data1 += "<p>Public Repos: " + res1['public-repos'] + "</p>";
      data1 += "<p>Total Stars: " + res1['total-stars'] + "</p>";
      data1 += "<p>Highest Starred: " + res1['highest-starred'] + "</p>";
      data1 += "<p>Perfect Repos: " + res1['perfect-repos'] + "</p>";
      data1 += "<p>Followers: " + res1.followers + "</p>";
      data1 += "<p>Following: " + res1.following + "</p>";
      observables[1].subscribe((res2 : Profile) => {
        data2 += "<p>Name: " + res2.name + "</p>";
        data2 += "<p>Username: " + res2.username + "</p>";
        data2 += "<p>Location: " + res2.location + "</p>";
        data2 += "<p>Bio: " + res2.bio + "</p>";
        data2 += "<p>Titles: " + res2.titles + "</p>";
        data2 += "<p>Favorite Language: " + res2['favorite-language'] + "</p>";
        data2 += "<p>Public Repos: " + res2['public-repos'] + "</p>";
        data2 += "<p>Total Stars: " + res2['total-stars'] + "</p>";
        data2 += "<p>Highest Starred: " + res2['highest-starred'] + "</p>";
        data2 += "<p>Perfect Repos: " + res2['perfect-repos'] + "</p>";
        data2 += "<p>Followers: " + res2.followers + "</p>";
        data2 += "<p>Following: " + res2.following + "</p>";
        profile1.innerHTML += data1;
        profile2.innerHTML += data2;
        if(res1['total-stars'] > res2['total-stars']) {
          checkbox1!.innerHTML = "<img src=\"../assets/check.png\" class=\"check\"/>";
        }
        else {
          checkbox2!.innerHTML = "<img src=\"../assets/check.png\" class=\"check\"/>";
        }
      })
    })
  }
}
