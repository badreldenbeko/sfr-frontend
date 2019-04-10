import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';
import {ProfileService} from '../core/profile.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  uid = this.auth.userMe;

  constructor(private auth: AuthService, private router: Router, private prof: ProfileService) {
  }

  ngOnInit() {
  }

  logout() {
    this.auth.setUserToken('');
    this.auth.setUserMe('');
    this.auth.setIsLoggedinStatus(false);
    this.prof.setIsHeadUser(false);
    this.router.navigate(['login']);
  }

}
