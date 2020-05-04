import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentLayoutComponent} from './shared/student-layout/student-layout.component';
import {RouterModule} from '@angular/router';
import {MyInfoPageComponent} from './my-info-page/my-info-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GradesPageComponent} from './grades-page/grades-page.component';
import {SearchGradeBySubjectAndTeacherPipe} from "../shared/pipes/search-grade-by-subject-and-teacher.pipe";
import {StudentGuard} from "./shared/student.guard";


@NgModule({
  declarations: [StudentLayoutComponent, MyInfoPageComponent, GradesPageComponent, SearchGradeBySubjectAndTeacherPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: StudentLayoutComponent, canActivateChild: [StudentGuard], children: [
        {path: '', redirectTo: '/student/my_info', pathMatch: 'full'},
        {path: 'my_info', component: MyInfoPageComponent},
        {path: 'grades', component: GradesPageComponent},
      ]
    }
    ]),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [StudentGuard]
})
export class StudentModule {
}
