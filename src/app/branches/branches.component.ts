import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {BranchService} from '../core/branch.service';
import {ProfileService} from '../core/profile.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branches;
  superUser = this.pro.isSuperUser;

  constructor(private auth: AuthService, private bs: BranchService, private pro: ProfileService) {
    this.getAllBranches();
  }

  ngOnInit() {
  }

  getAllBranches() {
    const token = this.auth.userToken;
    this.bs.getBranches(token).subscribe(
      res => {
        this.branches = res;
      }, err => {
        console.log(err);
      }
    );
  }

}
