import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Group, Student, StudentChoosing} from '../../../shared/interfaces';
import {DbService} from "../../../shared/services/db.service";


@Component({
  selector: 'app-create-group-page',
  templateUrl: './create-group-page.component.html',
  styleUrls: ['./create-group-page.component.scss']
})
export class CreateGroupPageComponent implements OnInit {
  isLoaded = false;
  studentsWithoutGroup: StudentChoosing[];
  form: FormGroup;
  strForSearchStudentSurname = '';

  constructor(private dbService: DbService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      groupName: new FormControl(null, [Validators.required])
    });
    this.getAllStudentsWithoutGroupFromDb();
  }

  private filterStudents(students: Student[]): StudentChoosing[] {
    return students.filter((student) => !student.group)
      .map((student) => {
        const studWithoutGroup: StudentChoosing = {
          ...student,
          isChosen: false
        };
        return studWithoutGroup;
      });
  }

  getAllStudentsWithoutGroupFromDb() {
    this.isLoaded = false;
    this.dbService.getAllStudents().subscribe(responseAllStudents => {
      this.studentsWithoutGroup = this.filterStudents(responseAllStudents);
      this.isLoaded = true;
    });
  }

  create() {
    this.isLoaded = false;
    const group: Group = {name: this.form.get('groupName').value};
    this.dbService.saveGroup(group, this.studentsWithoutGroup.filter(studentWithoutGroup => studentWithoutGroup.isChosen))
      .subscribe(updatedStudents => {
        this.studentsWithoutGroup = this.filterStudents(updatedStudents);
        this.isLoaded = true;
        this.form.reset();
        console.log(this.isLoaded);
      });
  }
}
