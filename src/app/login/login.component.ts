import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import * as UIkit from 'uikit';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };
    this.auth.login(loginData).subscribe(
      res => {
        this.auth.setIsLoggedinStatus(true);
        // @ts-ignore
        this.auth.setUserToken(res.access);
        this.getMe();
      }, err => {
        console.log(err);
        if (err.error.non_field_errors) {
          UIkit.notification(err.error.non_field_errors, {status: 'danger'});
        }
        if (err.error.username) {
          UIkit.notification('Username ' + err.error.username, {status: 'danger'});
        }
        if (err.error.password) {
          UIkit.notification('Password ' + err.error.password, {status: 'danger'});
        }
        if (err.name === 'HttpErrorResponse') {
          UIkit.notification('Server Connection Error', {status: 'danger'});
        }
      }
    );
  }

  getMe() {
    this.auth.getMe().subscribe(
      res => {
        // @ts-ignore
        this.auth.setUserMe(res.id);
        // @ts-ignore
        this.router.navigate([`home/${res.id}`]);
      }, err => console.log(err)
    );
  }

}
