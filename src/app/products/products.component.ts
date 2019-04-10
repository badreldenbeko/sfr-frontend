import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {ProductService} from '../core/product.service';
import {ProfileService} from '../core/profile.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  superUser = this.prof.isSuperUser;
  products;

  constructor(private auth: AuthService, private pro: ProductService, private prof: ProfileService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
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
