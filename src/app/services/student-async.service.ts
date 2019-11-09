import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Student} from '../models/student';
import {CareerService} from './career.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAsyncService {
  studentList = new Array<Student>();
  url = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/students/';

  constructor(private http: HttpClient, private careerService: CareerService) { }
  getAll(): Observable<any> {
    return this.http.get(this.url);
  }
  getCareers() {
    return this.careerService.getAll();
  }
  add(student: Student): Observable<any> {
    const httpOptions = {
       headers : new HttpHeaders({
         'Content-Type': 'application/json'
       }
  )};
    return this.http.post(this.url, student, httpOptions);
  }
  getById(id: number): Observable<any> {
    return this.http.get(this.url + id);
  }
  modify(id: number, student: Student): Observable<any> {
    return this.http.patch(this.url + id, student);
  }
 }
