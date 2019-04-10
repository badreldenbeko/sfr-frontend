import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {apiUrl} from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProducts(token) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(apiUrl + '/api/products', {headers});
  }

  getProductDetail(token, id) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(apiUrl + `/api/products/${id}/`, {headers});
  }

  updateProductData(token, id, proData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(apiUrl + `/api/products/${id}/`, proData, {headers});
  }
}
