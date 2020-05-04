import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import { MyInfoPageComponent } from './my-info-page/my-info-page.component';
import { NewStudentsPageComponent } from './students/new-students-page/new-students-page.component';
import { NewTeachersPageComponent } from './teachers/new-teachers-page/new-teachers-page.component';
import { NewSubjectsPageComponent } from './subjects/new-subjects-page/new-subjects-page.component';
import { StudentsPageComponent } from './students/students-page/students-page.component';
import { CreateGroupPageComponent } from './groups/create-group-page/create-group-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewStudentComponent } from './shared/components/new-student/new-student.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NewTeacherComponent } from './shared/components/new-teacher/new-teacher.component';
import { NewSubjectComponent } from './shared/components/new-subject/new-subject.component';
import { TeachersPageComponent } from './teachers/teachers-page/teachers-page.component';
import { SubjectsPageComponent } from './subjects/subjects-page/subjects-page.component';
import {GroupsPageComponent} from './groups/groups-page/groups-page.component';
import { StudentsLayoutComponent } from './students/shared/students-layout/students-layout.component';
import { TeachersLayoutComponent } from './teachers/shared/teachers-layout/teachers-layout.component';
import { GroupsLayoutComponent } from './groups/shared/groups-layout/groups-layout.component';
import { SubjectsLayoutComponent } from './subjects/shared/subjects-layout/subjects-layout.component';
import {SearchBySurnameTeacherPipe} from '../shared/pipes/search-by-surname-teacher.pipe';
import {StudentComponent} from '../shared/components/student/student.component';
import { WithoutWrappingTagHereDirective } from './shared/directives/without-wrapping-tag-here.directive';
import {TeacherComponent} from '../shared/components/teacher/teacher.component';
import {SubjectComponent} from '../shared/components/subject/subject.component';
import {GroupComponent} from '../shared/components/group/group.component';
import { WithoutWrappingTagBelowDirective } from './shared/directives/without-wrapping-tag-below.directive';
import {SearchBySurnameStudentChoosingPipe} from '../shared/pipes/search-by-surname-student-choosing.pipe';
import {SearchBySurnameStudentPipe} from '../shared/pipes/search-by-surname-student.pipe';
import {SearchByGroupStudentPipe} from '../shared/pipes/search-by-group-student.pipe';
import {SearchByNameSubjectPipe} from '../shared/pipes/search-by-name-subject.pipe';
import {SearchByNameGroupPipe} from '../shared/pipes/search-by-name-group.pipe';
import {AdminGuard} from './shared/admin.guard';
import { GradesPageComponent } from './grades-page/grades-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    MyInfoPageComponent,
    MyInfoPageComponent,
    NewStudentsPageComponent,
    NewTeachersPageComponent,
    NewSubjectsPageComponent,
    StudentsPageComponent,
    CreateGroupPageComponent,
    NewStudentComponent,
    NewTeacherComponent,
    NewSubjectComponent,
    StudentComponent,

    SearchBySurnameStudentPipe,
    SearchByGroupStudentPipe,
    SearchBySurnameStudentChoosingPipe,
    SearchBySurnameTeacherPipe,
    SearchByNameGroupPipe,
    SearchByNameSubjectPipe,


    TeachersPageComponent,
    SubjectsPageComponent,
    GroupsPageComponent,
    StudentsLayoutComponent,
    TeachersLayoutComponent,
    GroupsLayoutComponent,
    SubjectsLayoutComponent,
    WithoutWrappingTagHereDirective,
    TeacherComponent,
    SubjectComponent,
    GroupComponent,
    WithoutWrappingTagBelowDirective,
    GradesPageComponent
  ],
  imports: [
    MatButtonModule,
    MatButtonToggleModule,

    CommonModule,
    RouterModule.forChild([{
      path: '', component: AdminLayoutComponent, canActivateChild: [AdminGuard],
      children: [
        {path: '', redirectTo: '/admin/my_info', pathMatch: 'full'},
        {path: 'my_info', component: MyInfoPageComponent},
        {
          path: 'students', component: StudentsLayoutComponent, children: [
            {path: '', redirectTo: '/admin/students/list', pathMatch: 'full'},
            {path: 'list', component: StudentsPageComponent},
            {path: 'new', component: NewStudentsPageComponent}]
        },
        {
          path: 'teachers', component: TeachersLayoutComponent, children: [
            {path: '', redirectTo: '/admin/teachers/list', pathMatch: 'full'},
            {path: 'list', component: TeachersPageComponent},
            {path: 'new', component: NewTeachersPageComponent}]
        },
        {
          path: 'subjects', component: SubjectsLayoutComponent, children: [
            {path: '', redirectTo: '/admin/subjects/list', pathMatch: 'full'},
            {path: 'list', component: SubjectsPageComponent},
            {path: 'new', component: NewSubjectsPageComponent}]
        },
        {
          path: 'groups', component: GroupsLayoutComponent, children: [
            {path: '', redirectTo: '/admin/groups/list', pathMatch: 'full'},
            {path: 'list', component: GroupsPageComponent},
            {path: 'new', component: CreateGroupPageComponent}]
        },
        {
          path: 'grades', component: GradesPageComponent
        }
      ]
    }]),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RouterModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [AdminGuard]
})
export class AdminModule { }
