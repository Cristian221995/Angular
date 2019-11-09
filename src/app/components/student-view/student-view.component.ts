import { Component, OnInit } from '@angular/core';
import {StudentAsyncService} from '../../services/student-async.service';
import {ActivatedRoute} from '@angular/router';
import {Student} from '../../models/student';
import {CareerService} from '../../services/career.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  student: Student;
  constructor(private studentService: StudentAsyncService, private route: ActivatedRoute, private careerService: CareerService) { }

  ngOnInit() {
    let studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getById(studentId).then( st => {
      this.student = <Student>st;
      if (this.student.careerId) {
        this.careerService.getbyId(this.student.careerId).then( career => {
          this.student.career = career;
        });
      }
    });
  }

}
