import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://utn2019-avanzada2-tp8.herokuapp.com/';

  constructor(private http: HttpClient) { }

  add(user: User): Promise<any> {
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json'
        }
      )};
    return this.http.post(this.url + 'sign-up' , user, httpOptions).toPromise();
  }
  checkIfEmailExists(email) {
    return this.http.get('https://utn2019-avanzada2-tp8.herokuapp.com/users/identities?email=' + email).toPromise();
  }
  login(user: User): Promise<any> {
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json'
        }
      )};
    return this.http.post(this.url + 'login' , user, httpOptions).toPromise();
  }
}
