import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewStudent, NewTeacher} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-sign-up-as-teacher-page',
  templateUrl: './sign-up-as-teacher-page.component.html',
  styleUrls: ['./sign-up-as-teacher-page.component.scss']
})
export class SignUpAsTeacherPageComponent implements OnInit {
  isLoaded = true;
  form: FormGroup;
  errorFromServer = '';
  successStatus = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      surname: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required]),
    });
  }

  signUpAsTeacher() {
    this.isLoaded = false;
    const newTeacher: NewTeacher = {
      surname: this.form.get('surname').value,
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      wasApplied: 'none'
    };
    this.authService.signUpAsTeacher(newTeacher).subscribe((next) => {
        if (next === 'success') {
          this.successStatus = next;
          this.form.reset();
          this.isLoaded = true;
        }
      },
      (error) => {
        this.errorFromServer = error;
        this.isLoaded = true;
      });
    setTimeout(() => {
      this.successStatus = '';
      this.errorFromServer = '';
    }, 5000);
  }
}
