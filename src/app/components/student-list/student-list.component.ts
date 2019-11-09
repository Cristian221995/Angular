import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student';
import { StudentAsyncService } from '../../services/student-async.service';
import { CareerService } from '../../services/career.service';
import { Career } from '../../models/career';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList = new Array<Student>();
  constructor(private studentService: StudentAsyncService, private careerService: CareerService) { }

  ngOnInit() {
    const observable = this.studentService.getAll();
    observable.subscribe( response => {
      this.studentList = response;
      this.studentList.forEach( student => {
        if (student.careerId) {
          this.careerService.getbyId(student.careerId).then( career => {
            student.career = career;
          });
        }
      });
    },
    error => {
      console.log(error);
    });
  }
}
