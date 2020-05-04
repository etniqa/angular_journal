import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {DbService} from '../shared/services/db.service';
import {NewStudent} from '../shared/interfaces';

@Component({
  selector: 'app-sign-up-as-student-page',
  templateUrl: './sign-up-as-student-page.component.html',
  styleUrls: ['./sign-up-as-student-page.component.scss']
})
export class SignUpAsStudentPageComponent implements OnInit {
  isLoaded = true;
  form: FormGroup;
  errorFromServer: string;
  successStatus = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.form = new FormGroup({
      surname: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required]),
    });
    this.isLoaded = true;
  }

  signUpAsStudent() {
    this.isLoaded = false;
    const newStudent: NewStudent = {
      surname: this.form.get('surname').value,
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      wasApplied: 'none',
      group: null
    };
    this.authService.signUpAsStudent(newStudent).subscribe((next) => {
        if (next === 'success') {
          this.successStatus = next;
          this.form.reset();
          this.isLoaded = true;
        }
      },
      (error) => {
        console.log('from sign up', error);
        this.errorFromServer = error;
        this.isLoaded = true;
      });
    setTimeout(() => {
      this.successStatus = '';
      this.errorFromServer = '';
    }, 5000);
  }
}
