import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {apiUrl} from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) {
  }

  getSystems(token) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(apiUrl + '/api/systems/', {headers});
  }

  getSystemDetail(token, id) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(apiUrl + `/api/systems/${id}/`, {headers});
  }
}
