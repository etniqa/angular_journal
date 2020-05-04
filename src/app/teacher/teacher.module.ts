import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherLayoutComponent} from './shared/teacher-layout/teacher-layout.component';
import {RouterModule} from '@angular/router';
import {MyInfoPageComponent} from './my-info-page/my-info-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SubjectsPageComponent} from './subjects-page/subjects-page.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {GradesLayoutComponent} from './grades/shared/grades-layout/grades-layout.component';
import {NewGradePageComponent} from './grades/new-grade-page/new-grade-page.component';
import {ListGradesPageComponent} from './grades/list-grades-page/list-grades-page.component';
import {TeacherGuard} from "./shared/teacher.guard";


@NgModule({
  declarations: [
    TeacherLayoutComponent,
    MyInfoPageComponent,
    SubjectsPageComponent,

    GradesLayoutComponent,
    NewGradePageComponent,
    ListGradesPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: TeacherLayoutComponent, canActivateChild: [TeacherGuard], children: [
        {path: '', redirectTo: '/teacher/my_info', pathMatch: 'full'},
        {path: 'my_info', component: MyInfoPageComponent},
        {path: 'subjects', component: SubjectsPageComponent},
        {
          path: 'grades', component: GradesLayoutComponent, children: [
            {path: '', redirectTo: '/teacher/grades/list', pathMatch: 'full'},
            {path: 'list', component: ListGradesPageComponent},
            {path: 'new', component: NewGradePageComponent}
          ]
        },
      ]
    }]),
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonToggleModule
  ],
  exports: [
    MatSelectModule
  ]
})
export class TeacherModule {
}
