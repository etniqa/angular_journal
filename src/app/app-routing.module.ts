import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {SignUpAsTeacherPageComponent} from './sign-up-as-teacher-page/sign-up-as-teacher-page.component';
import {SignUpAsStudentPageComponent} from './sign-up-as-student-page/sign-up-as-student-page.component';


const routes: Routes = [{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'sign_up_as_teacher', component: SignUpAsTeacherPageComponent},
    {path: 'sign_up_as_student', component: SignUpAsStudentPageComponent},
  ]
},
  {
    path: 'admin',
    // lazy loading
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'student',
    // lazy loading
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'teacher',
    // lazy loading
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
