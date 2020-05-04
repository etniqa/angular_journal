import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {Admin, User} from "../shared/interfaces";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  isLoaded = true;
  errorFromServer = '';
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams.subscribe(params => {
      if (params['isFakeAccess']) {
        this.errorFromServer = '-_-';
      }
    });
    console.log(this.authService.activeUser);
  }

  private signIn(user: User) {
    this.isLoaded = false;
    this.authService.login(user).subscribe(
      typeOfUser => {
        switch (typeOfUser) {
          case 'admin': {
            this.router.navigate(['admin']);
            break;
          }
          case 'student': {
            this.router.navigate(['student']);
            break;
          }
          case 'teacher': {
            this.router.navigate(['teacher']);
            break;
          }
          default: {
            console.log('default in switch-case in login-page.component.ts, signIn meth');
          }
        }
      },
      (error) => {
        this.errorFromServer = error;
        const oldEmail = this.form.get('email').value;
        this.form.reset();
        if (error === 'wrong password') {
          this.form.get('email').setValue(oldEmail);
        }
        this.isLoaded = true;
      });
  }

  signInAsAdmin() {
    this.signIn(this.authService.baranovAdmin);
  }

  signInAsStudent() {
    const student: User = {email: 'student@gmail.com', password: 'student'};
    this.signIn(student);
  }

  signInAsTeacher() {
    this.signIn(this.authService.baranovTeacher);
  }

  signInFromForm() {
    const userFromForm: User = {email: this.form.get('email').value, password: this.form.get('password').value};
    this.signIn(userFromForm);
  }
}
