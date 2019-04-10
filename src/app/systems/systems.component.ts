import {Component, OnInit} from '@angular/core';
import {SystemService} from '../core/system.service';
import {AuthService} from '../core/auth.service';
import {ProfileService} from '../core/profile.service';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.css']
})
export class SystemsComponent implements OnInit {

  systems;
  superUser = this.prof.isSuperUser;
  uid = this.auth.userMe;

  constructor(private auth: AuthService, private prof: ProfileService, private sys: SystemService) {
    this.getAllSystems();
  }

  ngOnInit() {
  }

  getAllSystems() {
    const token = this.auth.userToken;
    this.sys.getSystems(token).subscribe(
      res => {
        this.systems = res;
      }, err => {
        console.log(err);
      }
    );
  }

}
