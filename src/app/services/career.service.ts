import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  url = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/careers/';

  constructor(private http: HttpClient) { }
  getAll(): Promise<any> {
    return this.http.get(this.url).toPromise();
  }
  getbyId(id: number): Promise<any> {
    return this.http.get(this.url + id).toPromise();
  }
}
