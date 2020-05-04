import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {DbService} from "../../shared/services/db.service";
import {Grade} from "../../shared/interfaces";

@Component({
  selector: 'app-grades-page',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss']
})
export class GradesPageComponent implements OnInit {
  isLoaded = false;
  grades: Grade[] = [];

  constructor(private authService: AuthService,
              private dbService: DbService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.dbService.getAllGradesForAdmin().subscribe(gradesFromServer => {
      this.grades = gradesFromServer;
      this.isLoaded = true;
    });
  }
}
