import { Component, OnInit } from '@angular/core';
import {NewSubject} from '../../../shared/interfaces';
import {DbService} from '../../../shared/services/db.service';

@Component({
  selector: 'app-new-subjects-page',
  templateUrl: './new-subjects-page.component.html',
  styleUrls: ['./new-subjects-page.component.scss']
})
export class NewSubjectsPageComponent implements OnInit {
  isLoaded = false;
  newSubjects: NewSubject[];

  constructor(private dbService: DbService) {
    this.getAllNewSubjects();
  }

  ngOnInit(): void {
  }

  getAllNewSubjects() {
    this.isLoaded = false;
    this.dbService.getAllNewSubjects().subscribe(responseAllNewSubjects => {
      this.newSubjects = responseAllNewSubjects;
      this.isLoaded = true;
    });
  }

  changeStatusForNewStudent(value: string, newSubject: NewSubject) {
    newSubject.wasApplied = value === 'apply' ? 'true' : value === 'reject' ? 'false' : 'none';
  }

  saveAllClick() {
    this.isLoaded = false;
    this.dbService.approveAndDisapproveNewSubjects(this.newSubjects).subscribe(updatedNewSubjects => {
      this.newSubjects = updatedNewSubjects;
      this.isLoaded = true;
      console.log('', this.newSubjects);
    });
  }
}
