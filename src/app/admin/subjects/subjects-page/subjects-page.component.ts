import {Component, OnInit} from '@angular/core';
import {Subject} from "../../../shared/interfaces";
import {DbService} from "../../../shared/services/db.service";

@Component({
  selector: 'app-subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.scss']
})
export class SubjectsPageComponent implements OnInit {
  isLoaded = false;
  subjects: Subject[];
  strForSearchGroupName = '';

  constructor(private dbService: DbService) {
    this.getAllSubjectsFromDb();
  }

  ngOnInit(): void {
  }

  getAllSubjectsFromDb() {
    this.isLoaded = false;
    this.dbService.getAllSubjects().subscribe(responseSubjects => {
      this.subjects = responseSubjects;
      this.isLoaded = true;
    });
  }

  deleteSubject(subjectForDelete: Subject) {
    this.isLoaded = false;
    this.dbService.deleteSubject(subjectForDelete).subscribe(updatedSubjects => {
      this.subjects = updatedSubjects;
      this.isLoaded = true;
    });
  }
}
