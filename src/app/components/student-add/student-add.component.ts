import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import {ActivatedRoute} from '@angular/router';
import {StudentAsyncService} from '../../services/student-async.service';
import {CareerService} from '../../services/career.service';
import {Career} from '../../models/career';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidator} from '../../models/custom-validator';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  careers = Array<Career>();
  student: Student = new Student();
  studentForm: FormGroup;

  constructor(private studentService: StudentAsyncService, private route: ActivatedRoute, private careerService: CareerService) { }

  ngOnInit() {
    this.careerService.getAll().then( careers => {
      this.careers = careers;
    });
    this.studentForm = new FormGroup({
      'firstName': new FormControl(this.student.firstName,
        [Validators.required, CustomValidator.onlyLetters() ]),
      'lastName': new FormControl(this.student.lastName,
        [Validators.required]),
      'email': new FormControl(this.student.email, Validators.required),
      'dni': new FormControl(this.student.dni, Validators.required),
      'address': new FormControl(this.student.address, Validators.required),
      'careerId': new FormControl(this.student.careerId)
    });
  }
  get firstName() { return this.studentForm.get('firstName'); }
  get lastName() { return this.studentForm.get('lastName'); }
  get email() { return this.studentForm.get('email'); }
  get address() { return this.studentForm.get('address'); }
  get dni() { return this.studentForm.get('dni'); }
  get careerId() { return this.studentForm.get('careerId'); }
  addStudent() {
    this.student.firstName = this.firstName.value;
    this.student.lastName = this.lastName.value;
    this.student.email = this.email.value;
    this.student.address = this.address.value;
    this.student.dni = this.dni.value;
    this.student.careerId = Number(this.careerId.value);
    console.log(this.student);
    const observable = this.studentService.add(this.student);
    observable.subscribe(
      response => {
        window.alert('The student was correctly added');
      },
      error => {
        window.alert('Oops, something was happened');
      },
    );
  }

}
