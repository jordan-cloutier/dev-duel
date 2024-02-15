import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import Profile from 'src/app/model/profile';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {

  username: string = ""


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    let observable = this.userService.inspectUser(this.username)
    let profile = document.getElementById("profile")!;
    profile.innerHTML ="";
    observable.subscribe(res => {
      profile.innerHTML += "<p>Name: " + res.name + "</p>";
      profile.innerHTML += "<p>Username: " + res.username + "</p>";
      profile.innerHTML += "<p>Location: " + res.location + "</p>";
      profile.innerHTML += "<p>Bio: " + res.bio + "</p>";
      profile.innerHTML += "<p>Titles: " + res.titles + "</p>";
      profile.innerHTML += "<p>Favorite Language: " + res['favorite-language'] + "</p>";
      profile.innerHTML += "<p>Public Repos: " + res['public-repos'] + "</p>";
      profile.innerHTML += "<p>Total Stars: " + res['total-stars'] + "</p>";
      profile.innerHTML += "<p>Highest Starred: " + res['highest-starred'] + "</p>";
      profile.innerHTML += "<p>Perfect Repos: " + res['perfect-repos'] + "</p>";
      profile.innerHTML += "<p>Followers: " + res.followers + "</p>";
      profile.innerHTML += "<p>Following: " + res.following + "</p>";
    });
    // if('message' in data) {
    //   profile.innerHTML = "<h1>The user does not exist</h1>";
    // }
    // else {
    //   profile.innerHTML = `<h1>${data.name}</h1>`;
    // }
  }



}
