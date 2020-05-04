import { Component, OnInit } from '@angular/core';
import {Grade} from "../../../shared/interfaces";
import {AuthService} from "../../../shared/services/auth.service";
import {DbService} from "../../../shared/services/db.service";

@Component({
  selector: 'app-list-grades-page',
  templateUrl: './list-grades-page.component.html',
  styleUrls: ['./list-grades-page.component.scss']
})
export class ListGradesPageComponent implements OnInit {
  isLoaded = false;
  grades: Grade[] = [];

  constructor(private authService: AuthService,
              private dbService: DbService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.dbService.getGradesForTeacher(this.authService.activeUser).subscribe(responseGrades => {
      this.grades = responseGrades;
      this.isLoaded = true;
    });
  }

}
