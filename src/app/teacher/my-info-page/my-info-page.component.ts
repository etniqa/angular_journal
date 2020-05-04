import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-my-info-page',
  templateUrl: './my-info-page.component.html',
  styleUrls: ['./my-info-page.component.scss']
})
export class MyInfoPageComponent implements OnInit {

  form: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      surname: new FormControl(this.authService.activeUser.surname, [Validators.required]),
      name: new FormControl(this.authService.activeUser.name, [Validators.required]),
      email: new FormControl(this.authService.activeUser.email, [Validators.required, Validators.email]),
      password: new FormControl(this.authService.activeUser.password, [Validators.minLength(6)])
    });
  }

  submit() {
    console.log('submit');
  }
}
