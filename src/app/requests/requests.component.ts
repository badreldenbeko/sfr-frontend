import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {RequestService} from '../core/request.service';
import {Router} from '@angular/router';
import {ProfileService} from '../core/profile.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  uid = this.auth.userMe;
  head = this.prof.isHeadUser;
  super = this.prof.isSuperUser;
  token = this.auth.userToken;

  requests;

  constructor(private auth: AuthService,
              private req: RequestService,
              private prof: ProfileService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllReuests();
  }

  getAllReuests() {
    this.req.getAllRequests(this.token).subscribe(
      res => {
        this.requests = res;
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
