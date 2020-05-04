import { Component, OnInit } from '@angular/core';
import {Grade} from "../../shared/interfaces";
import {AuthService} from "../../shared/services/auth.service";
import {DbService} from "../../shared/services/db.service";

@Component({
  selector: 'app-grades-page',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss']
})
export class GradesPageComponent implements OnInit {
  isLoaded = true;
  strForSearchGradeBySubject = '';
  strForSearchGradeByTeacher = '';
  grades: Grade[];

  constructor(private dbService: DbService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.dbService.getGradesForOneStudentById(this.authService.activeUser.id)
      .subscribe(grades => {
        this.grades = grades;
        this.isLoaded = true;
      });
  }

}
