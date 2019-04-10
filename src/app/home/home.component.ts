import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../core/profile.service';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile;

  constructor(private pro: ProfileService, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    const token = this.auth.userToken;
    const id = this.auth.userMe;
    this.pro.getUserProfile(token, id).subscribe(
      res => {
        this.profile = res;
        this.pro.setIsSuperUser(this.profile.user.is_superuser);
        this.pro.setIsHeadUser(this.profile.head_manager);
      }, err => {
        console.log(err);
        if (err.error.code === 'token_not_valid') {
          this.auth.handelSessionClosed();
          this.router.navigate(['login']);
        }
      }
    );
  }

}
