import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {apiUrl} from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = localStorage.getItem('token');
  private uid = localStorage.getItem('uid');
  private loggedinStatus = JSON.parse(localStorage.getItem('loggedIn'));

  constructor(private http: HttpClient) {
  }

  setUserToken(value: string) {
    this.token = value;
    localStorage.setItem('token', value);
  }

  get userToken() {
    return localStorage.getItem('token') || this.token;
  }

  setIsLoggedinStatus(value: boolean) {
    this.loggedinStatus = value;
    localStorage.setItem('loggedIn', this.loggedinStatus);
  }

  get isLoggedinStstus() {
    return JSON.parse(localStorage.getItem('loggedIn') || 'false');
  }

  login(loginData) {
    return this.http.post(apiUrl + '/api/jwt/create/', loginData);
  }

  getMe() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken
    });
    return this.http.get(apiUrl + '/api/users/me/', {headers});
  }

  setUserMe(value: string) {
    this.uid = value;
    localStorage.setItem('uid', value);
  }

  get userMe() {
    return localStorage.getItem('uid') || this.uid;
  }

  handelSessionClosed() {
    // this.setIsLoggedinStatus(false);
    // this.setUserToken('');
    // this.setUserMe('');
    localStorage.clear();
  }

}
