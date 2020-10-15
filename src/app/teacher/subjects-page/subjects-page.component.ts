import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../shared/interfaces";
import {DbService} from "../../shared/services/db.service";
import {AuthService} from "../../shared/services/auth.service";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.scss']
})
export class SubjectsPageComponent implements OnInit {
  isLoaded = false;
  isLoadedOwnSubjects = false;
  form: FormGroup;
  subjectsCanApply: Subject[] = [];
  ownSubjects: Subject[] = [];

  constructor(private authService: AuthService,
              private dbService: DbService) {
  }

  ngOnInit(): void {
    // TODO: make it without two booleans
    this.isLoaded = false;
    this.isLoadedOwnSubjects = false;
    this.form = new FormGroup({
        subjectCanApply: new FormControl('', [Validators.required])
      }
    );
    this.dbService.getSubjectsCanBeApplied(this.authService.activeUser).subscribe(
      responseSubjects => {
        this.subjectsCanApply = responseSubjects;
        this.isLoaded = true;
      }
    );
    this.dbService.getOwnSubjects(this.authService.activeUser).subscribe(
      responseSubjects => {
        this.ownSubjects = responseSubjects;
        this.isLoadedOwnSubjects = true;
      }
    );
  }

  applyToNewSubject() {
    this.isLoaded = false;
    console.log('apply to new subjectCanApply', this.form.get('subjectCanApply').value);
    this.dbService.applyNewSubject(this.authService.activeUser, JSON.parse(this.form.get('subjectCanApply').value))
      .subscribe(responseSubjectsCanApply => {
        this.subjectsCanApply = responseSubjectsCanApply;
        this.isLoaded = true;
    });
  }

  getJsonOfSubject(subjectCanApply: Subject) {
    return JSON.stringify(subjectCanApply);
  }
}
