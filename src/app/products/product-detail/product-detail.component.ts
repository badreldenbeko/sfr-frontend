import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../core/product.service';
import {AuthService} from '../../core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../core/error.service';
import {RequestService} from '../../core/request.service';
import {ProfileService} from '../../core/profile.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id = this.route.snapshot.paramMap.get('id');
  token = this.auth.userToken;
  head = this.prof.isHeadUser;

  hide = true;

  product;
  errors;
  selectedError;
  errDesc;
  requests;


  constructor(private auth: AuthService,
              private prof: ProfileService,
              private route: ActivatedRoute,
              private pro: ProductService,
              private err: ErrorService,
              private req: RequestService,
              private router: Router) {
  }

  ngOnInit() {
    this.getProductDetail();
    this.getAllErrors();
    this.getAllRequests();


  }

  getProductDetail() {
    this.pro.getProductDetail(this.token, this.id).subscribe(
      res => {
        this.product = res;
      }, err => {
        console.log(err);
        if (err.error.code === 'token_not_valid') {
          this.auth.handelSessionClosed();
          this.router.navigate(['login']);
        }
      }
    );
  }

  getAllErrors() {
    this.err.getAllErrors(this.token).subscribe(
      res => {
        this.errors = res;
      }, err => {
        console.log(err);
      }
    );
  }

  createRequest() {
    const proData = this.product;
    this.createErrorRequest();
    proData.in_request = true;
    this.pro.updateProductData(this.token, this.id, proData).subscribe(
      res => {
        console.log(res);
        this.hide = true;
        UIkit.notification('Request Created Successfully.', {status: 'success'})
        this.getProductDetail();
        this.getAllRequests();
      }, err => {
        console.log(err);
      }
    );
  }

  cancelRequest() {
    const proData = this.product;
    proData.in_request = false;
    this.pro.updateProductData(this.token, this.id, proData).subscribe(
      res => {
        console.log(res);
        this.hide = true;
        this.selectedError = null;
        this.getProductDetail();
      }, err => {
        console.log(err);
      }
    );
  }

  createErrorRequest() {
    const reqData = {
      product: this.product.id,
      error: this.selectedError,
      desc: this.errDesc
    };
    this.req.createRequest(this.token, reqData).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    );
  }

  getAllRequests() {
    this.req.getAllRequests(this.token).subscribe(
      res => {
        this.requests = res;
      }, err => {
        console.log(err);
      }
    );
  }

}
