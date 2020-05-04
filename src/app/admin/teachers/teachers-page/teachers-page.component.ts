import {Component, OnInit} from '@angular/core';
import {DbService} from '../../../shared/services/db.service';
import {Student, Teacher} from "../../../shared/interfaces";

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit {
  isLoaded = false;
  teachers: Teacher[];
  strForSearchTeacherSurname = '';

  constructor(private dbService: DbService) {
    this.getAllTeachersFromDb();
  }

  getAllTeachersFromDb() {
    this.isLoaded = false;
    this.dbService.getAllTeachers().subscribe((teachers => {
      this.teachers = teachers;
      this.isLoaded = true;
    }));
  }

  ngOnInit(): void {
  }

  deleteTeacher(teacherForDelete: Teacher) {
    this.isLoaded = false;
    this.dbService.deleteTeacher(teacherForDelete).subscribe(updatedTeachers => {
      this.teachers = updatedTeachers;
      this.isLoaded = true;
    });
  }
}
