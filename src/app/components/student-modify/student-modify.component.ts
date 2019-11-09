import { Component, OnInit } from '@angular/core';
import {Student} from '../../models/student';
import {StudentAsyncService} from '../../services/student-async.service';
import {ActivatedRoute} from '@angular/router';
import {CareerService} from '../../services/career.service';
import {Career} from '../../models/career';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student-modify',
  templateUrl: './student-modify.component.html',
  styleUrls: ['./student-modify.component.css']
})
export class StudentModifyComponent implements OnInit {
  careers = new Array<Career>();
  student: Student = new Student();
  modifyForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private studentService: StudentAsyncService, private route: ActivatedRoute, private careerService: CareerService, private router: Router) { }

  ngOnInit() {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getById(studentId).then( st => {
      this.student = <Student>st;
    });
    this.careerService.getAll().then( careers => {
      this.careers = careers;
    });
    this.modifyForm = new FormGroup({
      'firstName': new FormControl(this.student.firstName,
        [Validators.required, Validators.pattern('^([a-zA-Z])*$')]),
      'lastName': new FormControl(this.student.lastName,
        [Validators.required]),
      'email': new FormControl(this.student.email, Validators.required),
      'dni': new FormControl(this.student.dni, Validators.required),
      'address': new FormControl(this.student.address, Validators.required),
      'careerId': new FormControl(this.student.careerId)
    });
  }
  get firstName() { return this.modifyForm.get('firstName'); }
  get lastName() { return this.modifyForm.get('lastName'); }
  get email() { return this.modifyForm.get('email'); }
  get address() { return this.modifyForm.get('address'); }
  get dni() { return this.modifyForm.get('dni'); }
  get careerId() { return this.modifyForm.get('careerId'); }
  modifyStudent() {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.student.lastName = this.lastName.value;
    this.student.firstName = this.firstName.value;
    this.student.email = this.email.value;
    this.student.address = this.address.value;
    this.student.dni = this.dni.value;
    this.student.careerId = Number(this.careerId.value);
    this.studentService.modify(studentId, this.student).then( value => {
      window.alert('Student Modified!');
      this.router.navigateByUrl('view/' + studentId);
    }).catch(error => {
      console.log(error);
    });
  }

}
