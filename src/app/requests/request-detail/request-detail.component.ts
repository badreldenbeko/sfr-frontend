import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../core/request.service';
import {AuthService} from '../../core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../core/profile.service';
import {ProductService} from '../../core/product.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  token = this.auth.userToken;
  id = this.route.snapshot.paramMap.get('id');
  head = this.prof.isHeadUser;

  request;

  today = new Date();


  constructor(private req: RequestService,
              private auth: AuthService,
              private prof: ProfileService,
              private route: ActivatedRoute,
              private router: Router,
              private pro: ProductService) {
  }

  ngOnInit() {
    this.getRequestDetail();
  }

  getRequestDetail() {
    this.req.getRequestDetail(this.token, this.id).subscribe(
      res => {
        this.request = res;
        console.log(this.request);
        console.log(this.today.toJSON());
      }, err => {
        console.log(err);
        if (err.error.code === 'token_not_valid') {
          this.auth.handelSessionClosed();
          this.router.navigate(['login']);
        }
      }
    );
  }

  markRequest(status) {
    const reqData = this.request;
    reqData.status = status;
    if (status === 'i') {
      reqData.snt_time = this.today.toJSON();
    }
    this.req.requestUpdate(this.token, this.id, reqData).subscribe(
      res => {
        this.getRequestDetail();
        if (status === 'i') {
          UIkit.notification('Request Mark As Sent.', {status: 'primary'});
        }
        if (status === 'c') {
          const proData = this.request.product;
          proData.in_request = false;
          this.pro.updateProductData(this.token, proData.id, proData).subscribe(
            proRes => {
              UIkit.notification('Request Mark As Done.', {status: 'success'});
              this.getRequestDetail();
              console.log(proRes);
            }, err => {
              console.log(err);
            }
          );
        }
      }, err => {
        console.log(err);
      }
    );
  }

}
