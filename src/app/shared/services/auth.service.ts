import {Injectable} from '@angular/core';
import {DbService} from './db.service';
import {Admin, NewStudent, NewTeacher, Teacher, User} from '../interfaces';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoaded = true;
  private _activeUser: User;
  private _typeOfUser: string; // 'admin' | 'teacher' | 'student' | 'none' = 'none';

  get baranovTeacher(): Teacher {
    return this.dbService.baranovTeacher;
  }

  get baranovAdmin(): Admin {
    return this.dbService.baranovAdmin;
  }

  set activeUser(value: User) {
    this._activeUser = value;
  }

  get typeOfUser(): string {
    return this._typeOfUser;
  }

  get activeUser(): User {
    return this._activeUser;
  }

  constructor(private dbService: DbService,
              private router: Router) {
  }

  private setAllAfterSuccessLogin(type: string, user: User) {
    this._activeUser = user;
    return this._typeOfUser = type;
  }

  logout() {
    this.activeUser = null;
    this._typeOfUser = 'none';
    this.router.navigate(['/login']);
  }

  login(user: User): Observable<string> {
    this.isLoaded = false;
    let counter = 0;
    return new Observable<string>(subscriber => {
      this.dbService.getAllAdmins().subscribe(responseAdmins => {
        responseAdmins.forEach(admin => {
          if (user.email.valueOf() === admin.email.valueOf()) {
            if (user.password.valueOf() === admin.password.valueOf()) {
              counter = null;  // can be without thi
              subscriber.next(this.setAllAfterSuccessLogin('admin', admin));
            } else {
              subscriber.error('wrong password');
            }
          }
        });
        if (++counter === 3) {  // user isn`t admin and not anyone
          subscriber.error('There is no user');
        }
      });
      this.dbService.getAllTeachers().subscribe(responseTeachers => {
        responseTeachers.forEach(teacher => {
          if (user.email === teacher.email) {
            if (user.password === teacher.password) {
              counter = null;
              subscriber.next(this.setAllAfterSuccessLogin('teacher', teacher));
            } else {
              subscriber.error('wrong password');
            }
          }
        });
        if (++counter === 3) {  // user isn`t teacher and not anyone
          subscriber.error('There is no user');
        }
      });
      this.dbService.getAllStudents().subscribe(responseStudents => {
        responseStudents.forEach(student => {
          if (user.email === student.email) {
            if (user.password === student.password) {
              counter = null;
              subscriber.next(this.setAllAfterSuccessLogin('student', student));
            } else {
              subscriber.error('wrong password');
            }
          }
        });
        if (++counter === 3) {  // user isn`t student and not anyone
          subscriber.error('There is no user');
        }
      });
    });
  }

  signUpAsStudent(possibleNewStudent: NewStudent): Observable<string> {
    return new Observable<string>(subscriber => {
      this.dbService.getAllUsedEmails().subscribe(responseEmails => {
        if (responseEmails.filter(usedEmail => usedEmail === possibleNewStudent.email).length !== 0) {
          subscriber.error('this email is using');
        } else {
          this.dbService.addNewStudent(possibleNewStudent);
          subscriber.next('success');
        }
      });
    });
  }

  signUpAsTeacher(possibleNewTeacher: NewTeacher): Observable<string> {
    return new Observable<string>(subscriber => {
      this.dbService.getAllUsedEmails().subscribe(responseEmails => {
        if (responseEmails.filter(usedEmail => usedEmail === possibleNewTeacher.email).length !== 0) {
          subscriber.error('this email is using');
        } else {
          this.dbService.addNewTeacher(possibleNewTeacher);
          subscriber.next('success');
        }
      });
    });
  }

  isAuth() {
    return !!this._activeUser;
  }
}
