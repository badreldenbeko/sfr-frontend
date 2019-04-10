import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {apiUrl} from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private superUser = JSON.parse(localStorage.getItem('superUser'));
  private headUser = JSON.parse(localStorage.getItem('headUser'));

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  setIsSuperUser(value: boolean) {
    this.superUser = value;
    localStorage.setItem('superUser', this.superUser);
  }

  get isSuperUser() {
    return JSON.parse(localStorage.getItem('superUser') || 'false');
  }

  setIsHeadUser(value: boolean) {
    this.headUser = value;
    localStorage.setItem('headUser', this.headUser);
  }

  get isHeadUser() {
    return JSON.parse(localStorage.getItem('headUser') || 'false');
  }

  getUserProfile(token, id) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(apiUrl + `/api/profiles/${id}/`, {headers});
  }

  getProfiles(token) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(apiUrl + `/api/profiles/`, {headers});
  }
}
