import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BranchService} from '../../core/branch.service';
import {AuthService} from '../../core/auth.service';
import {SystemService} from '../../core/system.service';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.css']
})
export class BranchDetailComponent implements OnInit {

  branch;
  systems;

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private brs: BranchService,
              private router: Router,
              private sys: SystemService) {
  }

  ngOnInit() {
    this.getDetails();
    this.getSystems();
  }

  getDetails() {
    const token = this.auth.userToken;
    const id = this.route.snapshot.paramMap.get('id');
    this.brs.getBranchDetails(token, id).subscribe(
      res => {
        this.branch = res;
      }, err => {
        console.log(err);
        if (err.error.code === 'token_not_valid') {
          this.auth.handelSessionClosed();
          this.router.navigate(['login']);
        }
      }
    );
  }

  getSystems() {
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
