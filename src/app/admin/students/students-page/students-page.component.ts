import {Component, OnInit} from '@angular/core';
import {Student} from '../../../shared/interfaces';
import {DbService} from "../../../shared/services/db.service";

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit {
  students: Student[];
  isLoaded = false;

  strForSearchStudentSurname = '';
  strForSearchStudentGroup = '';

  constructor(private dbService: DbService) {
  }

  ngOnInit(): void {
    this.getAllStudentsFromDb();
  }

  getAllStudentsFromDb() {
    this.isLoaded = false;
    this.dbService.getAllStudents().subscribe((students) => {
      this.students = students;
      this.isLoaded = true;
    });
  }

  deleteStudent(studentForDelete: Student) {
    this.isLoaded = false;
    this.dbService.deleteStudent(studentForDelete).subscribe(updatedStudents => {
      this.students = updatedStudents;
      this.isLoaded = true;
    });
  }
}
