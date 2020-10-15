import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-teacher-layout',
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.scss']
})
export class TeacherLayoutComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
