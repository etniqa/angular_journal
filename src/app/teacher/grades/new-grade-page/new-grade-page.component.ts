import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Student, StudentChoosing, Subject, Teacher} from "../../../shared/interfaces";
import {AuthService} from "../../../shared/services/auth.service";
import {DbService} from "../../../shared/services/db.service";

@Component({
  selector: 'app-new-grade-page',
  templateUrl: './new-grade-page.component.html',
  styleUrls: ['./new-grade-page.component.scss']
})
export class NewGradePageComponent implements OnInit {
  isLoaded = false;
  form: FormGroup;
  allStudents: StudentChoosing[] = [];
  subjects: Subject[] = [];
  chosenStudent: StudentChoosing = null;
  chosenSubject: Subject = null;
  grades: number[] = Array.from({length: 12}, (val, k) => k + 1);

  constructor(private authService: AuthService,
              private dbService: DbService) {
  }

  ngOnInit(): void {
    this.isLoaded = false;
    this.dbService.getAllStudents().subscribe(responseStudents => {
      responseStudents.forEach(responseStudent => this.allStudents.push({...responseStudent, isChosen: false}));
      this.isLoaded = true;
    });
    this.dbService.getOwnSubjects(this.authService.activeUser).subscribe(rspnsSubjects => {
      this.subjects = rspnsSubjects;
      this.isLoaded = true;
    });
    this.form = new FormGroup({
      student: new FormControl(null, [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
      grade: new FormControl(null, [Validators.required]),
    });
  }

  addNewGrade() {
    this.dbService.addNewGrade({
        value: this.form.get('grade').value,
        student: this.form.get('student').value,
        subject: this.subjects.find(subject => subject.id === this.form.get('subject').value),
        teacher: this.authService.activeUser
      }
    );
    this.form.reset();
    this.chosenSubject = null;
    this.chosenStudent = null;
  }

  clickedOnThisStudent({studentChoosing}: { studentChoosing: StudentChoosing }) {
    this.allStudents.forEach(student => {
      student.isChosen = false;
    });
    studentChoosing.isChosen = true;
    this.chosenStudent = studentChoosing;
    this.form.get('student').setValue(studentChoosing);
  }

  selectSubject(id: string) {
    this.chosenSubject = this.subjects.find(subject => subject.id === id);
  }
}
