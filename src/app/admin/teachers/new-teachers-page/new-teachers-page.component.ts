import { Component, OnInit } from '@angular/core';
import {NewTeacher} from "../../../shared/interfaces";
import {DbService} from "../../../shared/services/db.service";

@Component({
  selector: 'app-new-teachers-page',
  templateUrl: './new-teachers-page.component.html',
  styleUrls: ['./new-teachers-page.component.scss']
})
export class NewTeachersPageComponent implements OnInit {
  isLoaded = false;
  newTeachers: NewTeacher[];
  constructor(private dbService: DbService) {
    this.getAllNewTeachers();
  }

  ngOnInit(): void {
  }

  getAllNewTeachers() {
    this.isLoaded = false;
    this.dbService.getAllNewTeachers().subscribe(responseNewTeachers => {
      this.newTeachers = responseNewTeachers;
      this.isLoaded = true;
    });
  }

  changeStatusForNewTeacher(value: string, student: NewTeacher) {
    student.wasApplied = value === 'apply' ? 'true' : value === 'reject' ? 'false' : 'none';
  }

  saveAllClick() {
    this.isLoaded = false;
    this.dbService.approveAndDisapproveNewTeachers(this.newTeachers).subscribe(updatedNewTeachers => {
      this.newTeachers = updatedNewTeachers;
      this.isLoaded = true;
      console.log('', this.newTeachers);
    });
  }

}
