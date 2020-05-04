import { Component, OnInit } from '@angular/core';
import {NewStudent, Student} from '../../../shared/interfaces';
import {DbService} from "../../../shared/services/db.service";

@Component({
  selector: 'app-new-students-page',
  templateUrl: './new-students-page.component.html',
  styleUrls: ['./new-students-page.component.scss']
})

export class NewStudentsPageComponent implements OnInit {
  isLoaded = false;
  newStudents: NewStudent[];
  constructor(private dbService: DbService) {
    this.getAllNewStudents();
  }

  ngOnInit(): void {
  }

  getAllNewStudents() {
    this.isLoaded = false;
    this.dbService.getAllNewStudents().subscribe(responseNewStudents => {
      this.newStudents = responseNewStudents;
      this.isLoaded = true;
    });
  }

  changeStatusForNewStudent(value: string, student: NewStudent) {
    student.wasApplied = value === 'apply' ? 'true' : value === 'reject' ? 'false' : 'none';
  }

  saveAllClick() {
    // delete all with true and false in wasApplied;
    // send to realStudents all with wasApplied: true
    this.isLoaded = false;
    this.dbService.approveAndDisapproveNewStudents(this.newStudents).subscribe(updatedNewStudents => {
      this.newStudents = updatedNewStudents;
      this.isLoaded = true;
      console.log('', this.newStudents);
    });
  }
}
