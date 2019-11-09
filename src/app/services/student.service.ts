import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentList = new Array<Student>();
  private studentId = 0;

  constructor() { }
  add(student: Student) {
    this.studentId ++;
    student.studentId = this.studentId;
    this.studentList.push(student);
  }
  getAll() {
    return this.studentList;
  }
  delete(student) {
    let index = this.studentList.indexOf(student);
    this.studentList.splice(index, 1);
  }
  getById(id: number) {
    let student = this.studentList.filter(student2 => {
      return student2.studentId === id;
    });
  }
}
