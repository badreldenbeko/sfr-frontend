import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../core/profile.service';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  profiles;

  constructor(private pro: ProfileService, private auth: AuthService) {
    this.getProfiles();
  }

  ngOnInit() {
  }

  getProfiles() {
    const token = this.auth.userToken;
    this.pro.getProfiles(token).subscribe(
      res => {
        this.profiles = res;
      }, err => {
        console.log(err);
      }
    );
  }
}
