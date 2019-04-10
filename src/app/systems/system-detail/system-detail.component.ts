import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {SystemService} from '../../core/system.service';
import {ProductService} from '../../core/product.service';

@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
  styleUrls: ['./system-detail.component.css']
})
export class SystemDetailComponent implements OnInit {

  system;
  products;

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private sys: SystemService,
              private pro: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.getSystemDetail();
    this.getSystemProducts();
  }

  getSystemDetail() {
    const token = this.auth.userToken;
    const id = this.route.snapshot.paramMap.get('id');
    this.sys.getSystemDetail(token, id).subscribe(
      res => {
        this.system = res;
      }, err => {
        console.log(err);
        if (err.error.code === 'token_not_valid') {
          this.auth.handelSessionClosed();
          this.router.navigate(['login']);
        }
      }
    );
  }

  getSystemProducts() {
    const token = this.auth.userToken;
    this.pro.getAllProducts(token).subscribe(
      res => {
        this.products = res;
      }, err => {
        console.log(err);
      }
    );
  }

}
