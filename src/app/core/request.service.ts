import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {apiUrl} from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  createRequest(token, reqData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(apiUrl + '/api/requests-create/', reqData, {headers});
  }

  getAllRequests(token) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(apiUrl + '/api/requests/', {headers});
  }

  getRequestDetail(token, id) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(apiUrl + `/api/requests/${id}/`, {headers});
  }

  requestUpdate(token, id, reqData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(apiUrl + `/api/requests/${id}/`, reqData, {headers});
  }

}
