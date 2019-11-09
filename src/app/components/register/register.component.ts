import { Component, OnInit } from '@angular/core';
import {Student} from '../../models/student';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomValidator} from '../../models/custom-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  UserForm: FormGroup;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.UserForm = new FormGroup({
      'email': new FormControl(this.user.email,
        [Validators.required, Validators.email, CustomValidator.emailExists(this.userService)]),
      'password': new FormControl(this.user.password,
        [Validators.required]),
    });
  }
  get email() { return this.UserForm.get('email'); }
  get password() { return this.UserForm.get('password'); }
  addUser() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    console.log(this.user);
    this.userService.add(this.user).then(aux => {
      window.alert('User added correctly');
      this.router.navigateByUrl('login');
    }).catch(error => {
      console.log(error);
    });
  }

}
