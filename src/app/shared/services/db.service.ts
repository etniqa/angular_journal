import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  Admin,
  Grade,
  Group,
  NewStudent,
  NewSubject,
  NewTeacher,
  Student,
  StudentChoosing,
  Subject,
  Teacher, TeacherHasSubject,
  User
} from '../interfaces';
import set = Reflect.set;
import {log} from "util";

@Injectable({providedIn: 'root'})
export class DbService {
  delay = 500;
  db: string;

  group1: Group = {id: this.randId(), name: '243(1)'};
  group2: Group = {id: this.randId(), name: '243(2)'};
  groups: Group[] = [this.group1, this.group2];

  _baranovAdmin: Admin = {
    id: 'centurion',
    name: 'Steve',
    surname: 'Baranov',
    email: 'admin@gmail.com',
    password: 'password'
  }

  get baranovAdmin(): Admin {
    return this._baranovAdmin;
  }

  // tslint:disable-next-line:variable-name
  _baranovStudent: Student = {
    id: 'id',
    surname: 'Baranov',
    name: 'Stepan',
    email: 'student@gmail.com',
    password: 'student',
    group: this.group1
  };
  get baranovStudent(): Student {
    return this._baranovStudent;
  }

  // tslint:disable-next-line:variable-name
  _baranovTeacher: Teacher = {
    id: 'centurion',
    name: 'Steve',
    surname: 'Baranov',
    email: 'teacher@gmail.com',
    password: 'teacher'
  };

  get baranovTeacher(): Teacher {
    return this._baranovTeacher;
  }

  admins: Admin[] = [this._baranovAdmin];

  sokolyukStudent: Student = {
    id: this.randId(),
    surname: 'Sokolyuk',
    name: 'Alice',
    email: 'fraufalke@gmail.com',
    password: 'password',
    group: this.group1
  };
  skrypnykStudent: Student = {
    id: this.randId(),
    surname: 'Skrypnuk',
    name: 'Yaroslav',
    email: 'violonchelist@gmail.com',
    password: 'password',
    group: null
  };
  voznyukStudent: Student = {
    id: this.randId(),
    surname: 'Voznyuk',
    name: 'Kateryna',
    email: 'voznyuk@gmail.com',
    password: 'password',
    group: null
  };
  balenStudent: Student = {
    id: this.randId(),
    surname: 'Balen',
    name: 'Sergiy',
    email: 'balen@gmail.com',
    password: 'password',
    group: null
  };

  students: Student[] = [
    this._baranovStudent,
    this.sokolyukStudent,
    this.skrypnykStudent,
    this.voznyukStudent,
    this.balenStudent
  ];
  myronTeacher = {
    id: this.randId(),
    name: 'Myron',
    surname: 'Myroniv',
    email: 'davIRobit@gmail.com',
    password: 'password'
  };
  komisarTeacher = {
    id: this.randId(),
    name: 'Komisarchuk',
    surname: 'Komisar',
    email: 'samtukomisar@gmail.com',
    password: 'password'
  };
  proxorovTeaacher: Teacher = {
    id: this.randId(),
    name: 'Proxorov',
    surname: 'Batya',
    email: '10letVdele@gmail.com',
    password: 'password'
  };
  zhmuharTeacher: Teacher = {
    id: this.randId(),
    name: 'Zhmuharenko',
    surname: 'Zhuhar',
    email: 'zharkoSyougodni@mail.ru',
    password: 'password'
  };
  teachers: Teacher[] = [
    this._baranovTeacher,
    this.komisarTeacher,
    this.proxorovTeaacher,
    this.zhmuharTeacher,
    this.myronTeacher
  ];

  javaSubj: Subject = {id: this.randId(), name: 'java'};
  osSubj: Subject = {id: this.randId(), name: 'os'};
  angularSubject: Subject = {id: this.randId(), name: 'angular'};
  subjects: Subject[] = [
    this.javaSubj,
    this.osSubj,
    this.angularSubject
  ];
  // new elements
  newStudents: NewStudent[] = [
    {
      id: this.randId(),
      name: 'Steve',
      surname: 'Baranov',
      email: 'newstudent@gmail.com',
      password: 'newstudent',
      group: null,
      wasApplied: 'none'
    },
    {
      id: this.randId(),
      name: 'Danya',
      surname: 'Rudchenko',
      email: 'grw@gmail.com',
      password: 'password',
      group: null,
      wasApplied: 'none'
    },
    {
      id: this.randId(),
      name: 'Max',
      surname: 'Zhubya',
      email: 'gfdsgdsf@gmail.com',
      password: 'password',
      group: null,
      wasApplied: 'none'
    },
    {
      id: this.randId(),
      name: 'Oleh',
      surname: 'OgoOleh',
      email: 'asfdjk@gmail.com',
      password: 'password',
      group: null,
      wasApplied: 'none'
    }
  ];
  newTeachers: NewTeacher[] = [
    {
      id: this.randId(),
      name: 'Myron',
      surname: 'Myroniv',
      email: 'adfj@gaml',
      password: 'password',
      wasApplied: 'none'
    },
    {
      id: this.randId(),
      name: 'Komisar',
      surname: 'Komisarchuk',
      email: 'asdfasf@gaml',
      password: 'password',
      wasApplied: 'none'
    },
    {
      id: this.randId(),
      name: 'Proxorov',
      surname: 'Grisha',
      email: 'trhsrdgdr@gaml',
      password: 'password',
      wasApplied: 'none'
    },
    {
      id: this.randId(),
      name: 'Zhuharenko',
      surname: 'Zhmuharenko',
      email: 'fasgdr@gaml',
      password: 'password',
      wasApplied: 'none'
    }];
  teacherApplySubject: NewSubject[] = [
    {id: this.randId(), subject: this.osSubj, teacherWhoPropose: this.proxorovTeaacher, wasApplied: 'none'},
    {id: this.randId(), subject: this.osSubj, teacherWhoPropose: this.myronTeacher, wasApplied: 'none'},
    {id: this.randId(), subject: this.osSubj, teacherWhoPropose: this.baranovTeacher, wasApplied: 'none'},
  ];
  // grades
  grades: Grade[] = [
    {
      id: this.randId(),
      date: new Date(), value: 10,
      teacher: this.myronTeacher,
      subject: this.angularSubject,
      student: this._baranovStudent
    },
    {
      id: this.randId(),
      date: new Date(),
      value: 6,
      teacher: this.proxorovTeaacher,
      subject: this.javaSubj,
      student: this.baranovStudent
    },
    {
      id: this.randId(),
      date: new Date(), value: 7,
      teacher: this.zhmuharTeacher,
      subject: this.osSubj,
      student: this._baranovStudent
    },
    {
      id: this.randId(),
      date: new Date(), value: 10,
      teacher: this.komisarTeacher,
      subject: this.osSubj,
      student: this.sokolyukStudent,
    },
    {
      id: this.randId(),
      date: new Date(), value: 12,
      teacher: this.baranovTeacher,
      subject: this.angularSubject,
      student: this.baranovStudent,
    },
    {
      id: this.randId(),
      date: new Date(), value: 5,
      teacher: this.komisarTeacher,
      subject: this.angularSubject,
      student: this.skrypnykStudent,
    },
    {
      id: this.randId(),
      date: new Date(), value: 8,
      teacher: this.baranovTeacher,
      subject: this.osSubj,
      student: this.balenStudent,
    },
    {
      id: this.randId(),
      date: new Date(), value: 12,
      teacher: this.baranovTeacher,
      subject: this.osSubj,
      student: this.sokolyukStudent,
    }
  ];

  teacherHasSubject: TeacherHasSubject[] = [
    {id: this.randId(), teacher: this.komisarTeacher, subject: this.osSubj},
    {id: this.randId(), teacher: this.zhmuharTeacher, subject: this.osSubj},
    {id: this.randId(), teacher: this.proxorovTeaacher, subject: this.javaSubj},
    {id: this.randId(), teacher: this.myronTeacher, subject: this.angularSubject},

    {id: this.randId(), teacher: this.baranovTeacher, subject: this.angularSubject},
  ];

  private allUsedEmails: string[] = [
    ...this.students.map(student => student.email),
    ...this.teachers.map(teacher => teacher.email),
    ...this.admins.map(admin => admin.email),
    ...this.newStudents.map(newStudent => newStudent.email),
    ...this.newTeachers.map(newTeacher => newTeacher.email)
  ];


  getAllUsedEmails(): Observable<string[]> {
    return new Observable<string[]>(subscriber => {
      setTimeout(() => {
        subscriber.next(this.allUsedEmails);
      }, this.delay);
    });
  }

  private deleteFromAllUsed(deleteEmail: string) {
    this.allUsedEmails = this.allUsedEmails.filter(usedEmail => usedEmail !== deleteEmail);
    console.log('for delete', deleteEmail);
    console.log('', this.allUsedEmails);
  }

  private isInAllUsedEmails(searchEmail: string) {
    return this.allUsedEmails.find(usedEmail => usedEmail === searchEmail).length > 0;
  }

  private randId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  constructor() {
    this.db = 'newStudents: ' + JSON.stringify(this.students);
  }

  getAllAdmins(): Observable<Admin[]> {
    return new Observable<Admin[]>(subscriber => {
        setTimeout(() => subscriber.next(this.admins), this.delay);
      }
    );
  }

  getAllStudents(): Observable<Student[]> {
    return new Observable<Student[]>(subscriber => {
        setTimeout(() => subscriber.next(this.students), this.delay);
      }
    );
  }

  getAllTeachers(): Observable<Teacher[]> {
    return new Observable<Teacher[]>(subscriber => {
        setTimeout(() => subscriber.next(this.teachers), this.delay);
      }
    );
  }

  getAllGroups(): Observable<Group[]> {
    return new Observable<Group[]>(subscriber => {
        setTimeout(() => subscriber.next(this.groups), this.delay);
      }
    );
  }

  getAllNewUsers(): Observable<User[]> {
    return new Observable<User[]>(subscriber => {
      let nextUsers: User[] = [];
      let counterShouldBe2 = 0;
      this.getAllNewStudents().subscribe(responseNewStudents => {
        responseNewStudents.forEach(newStudent => {
          nextUsers.push({...newStudent});
        });
        if (++counterShouldBe2 === 2) {
          subscriber.next(nextUsers);
        }
      });
      this.getAllTeachers().subscribe(responseNewTeachers => {
        responseNewTeachers.forEach(newTeacher => {
          nextUsers.push({...newTeacher});
        });
        if (++counterShouldBe2 === 2) {
          subscriber.next(nextUsers);
        }
      });
    });
  }

  getAllNewStudents(): Observable<NewStudent[]> {
    return new Observable<NewStudent[]>(subscriber => {
        setTimeout(() => subscriber.next(this.newStudents), this.delay);
      }
    );
  }

  getAllNewTeachers(): Observable<NewTeacher[]> {
    return new Observable<NewTeacher[]>(subscriber => {
        setTimeout(() => subscriber.next(this.newTeachers), this.delay);
      }
    );
  }

  getAllNewSubjects(): Observable<NewSubject[]> {
    return new Observable<NewSubject[]>(subscriber => {
        console.log('new subjects', this.teacherApplySubject);
        setTimeout(() => subscriber.next(this.teacherApplySubject), this.delay);
      }
    );
  }

  getAllGrades(): Observable<Grade[]> {
    return new Observable<Grade[]>(subscriber => {
        setTimeout(() => subscriber.next(this.grades), this.delay);
      }
    );
  }

  getGradesForOneStudentById(id: string): Observable<Grade[]> {
    return new Observable<Grade[]>(subscriber => {
        setTimeout(() => {
            subscriber.next(this.grades.filter(grade => grade.student.id === id));
          },
          this.delay);
      }
    );
  }

  addNewStudent(newStudent: NewStudent) {
    this.newStudents.push(newStudent);
    this.allUsedEmails.push(newStudent.email);
  }

  addNewTeacher(newTeacher: NewTeacher) {
    this.newTeachers.push(newTeacher);
    this.allUsedEmails.push(newTeacher.email);
  }

  deleteStudent(studentForDelete: Student): Observable<Student[]> {
    return new Observable<Student[]>(subscriber => {
        setTimeout(() => {
          this.students = this.students.filter(student => student.id !== studentForDelete.id);
          this.deleteFromAllUsed(studentForDelete.email);
          subscriber.next(this.students);
        }, this.delay);
      }
    );
  }

  deleteTeacher(teacherForDelete: Teacher): Observable<Teacher[]> {
    return new Observable<Teacher[]>(subscriber => {
        setTimeout(() => {
            this.teachers = this.teachers.filter(teacher => teacher.id !== teacherForDelete.id);
            this.deleteFromAllUsed(teacherForDelete.email);
            subscriber.next(this.teachers);
          },
          this.delay);
      }
    );
  }

  deleteSubject(subjectForDelete: Subject): Observable<Subject[]> {
    return new Observable<Subject[]>(subscriber => {
        setTimeout(() => {
            this.subjects = this.subjects.filter(subject => subject.id !== subjectForDelete.id);
            subscriber.next(this.subjects);
          },
          this.delay);
      }
    );
  }
  deleteGroup(groupForDelete: Group): Observable<Group[]> {
    return new Observable<Group[]>(subscriber => {
        setTimeout(() => {
            this.groups = this.groups.filter(group => group.id !== groupForDelete.id);
            subscriber.next(this.groups);
          },
          this.delay);
      }
    );
  }

  approveAndDisapproveNewStudents(newStudentsFromFront: NewStudent[]): Observable<NewStudent[]> {
    return new Observable<NewStudent[]>(subscriber => {
        setTimeout(() => {
            this.newStudents = newStudentsFromFront.filter(newStudentFromFront => {
              switch (newStudentFromFront.wasApplied) {
                case 'true':
                  this.students.push(newStudentFromFront);
                  break;
                case 'false':
                  this.deleteFromAllUsed(newStudentFromFront.email);
                  break;
                case 'none':
                  return true;
              }
            });
            subscriber.next(this.newStudents);
          },
          this.delay);
      }
    );
  }
  approveAndDisapproveNewTeachers(newTeachersFromFront: NewTeacher[]): Observable<NewTeacher[]> {
    return new Observable<NewTeacher[]>(subscriber => {
        setTimeout(() => {
            this.newTeachers = newTeachersFromFront.filter(newTeacherFromFront => {
              switch (newTeacherFromFront.wasApplied) {
                case 'true':
                  this.teachers.push(newTeacherFromFront);
                  break;
                case 'false':
                  this.deleteFromAllUsed(newTeacherFromFront.email);
                  break;
                case 'none':
                  return true;
              }
            });
            subscriber.next(this.newTeachers);
          },
          this.delay);
      }
    );
  }
  approveAndDisapproveNewSubjects(newSubjectsFromFront: NewSubject[]): Observable<NewSubject[]> {
    return new Observable<NewSubject[]>(subscriber => {
        setTimeout(() => {
            this.teacherApplySubject = newSubjectsFromFront.filter(newSubjectFromFront => {
              if (newSubjectFromFront.wasApplied === 'true')
                this.teacherHasSubject
                  .push({
                    id: this.randId(),
                    teacher: newSubjectFromFront.teacherWhoPropose,
                    subject: newSubjectFromFront.subject
                  });
              else if (newSubjectFromFront.wasApplied === 'none') return true;
            });
            subscriber.next(this.teacherApplySubject);
          }, this.delay);
      }
    );
  }

  saveGroup(group: Group, studentsWhoInThisGroup: StudentChoosing[]): Observable<Student[]> {
    // set group in certain students
    return new Observable(subscriber => {
      setTimeout(() => {
        this.students.filter(student => !student.group) // filter students without group
          .map(student => {
            if (studentsWhoInThisGroup.find(studentWhoInThisGroup => studentWhoInThisGroup.id === student.id)) {
              student.group = group;
            }
          });
        group.id = this.randId();
        this.groups.push(group);
        subscriber.next(this.students);
      }, this.delay);
    });
  }

  editAdmin(editedAdminFromFront: Admin): Observable<Admin> {
    return new Observable<Admin>(subscriber => {
      setTimeout(() => {
        this.admins = this.admins.map(admin => {
          if (admin.id === editedAdminFromFront.id) return editedAdminFromFront;
          else return admin;
        });
        subscriber.next(editedAdminFromFront);
      }, this.delay);
    });
  }

  getAllGradesForAdmin() {
    return new Observable<Grade[]>(subscriber => {
      setTimeout(() => {
        subscriber.next(this.grades);
      }, this.delay);
    });
  }

  getAllSubjects(): Observable<Subject[]> {
    return new Observable<Subject[]>(subscriber => {
        setTimeout(() => subscriber.next(this.subjects), this.delay);
      }
    );
  }
  getSubjectsCanBeApplied(teacher: Teacher): Observable<Subject[]> {
    return new Observable<Subject[]>(subscriber => {
        setTimeout(() => {
          const teacherHasSubjectsForTeacherWhoSentRequest = this.teacherHasSubject.filter(
            oneTeacherHasSubject => oneTeacherHasSubject.teacher.id === teacher.id
          );
          let response: Subject[];
          response = this.subjects.filter(
            subject => !teacherHasSubjectsForTeacherWhoSentRequest.find(
              teacherHasSubject => {
                return teacherHasSubject.subject.id === subject.id;
              }
            )
          );
          response = response.filter(subj => !this.teacherApplySubject.find(
            application => subj.id === application.subject.id
          ));
          subscriber.next(response);
        }, this.delay);
      }
    );
  }
  getOwnSubjects(teacher: Teacher): Observable<Subject[]> {
    return new Observable<Subject[]>(subscriber => {
        setTimeout(() => {
          const teacherHasSubjectsForTeacherWhoSentRequest = this.teacherHasSubject.filter(
            oneTeacherHasSubject => oneTeacherHasSubject.teacher.id === teacher.id
          );
          subscriber.next(this.subjects.filter(
            subject => teacherHasSubjectsForTeacherWhoSentRequest.find(
              teacherHasSubject => teacherHasSubject.subject.id === subject.id
            )
          ));
        }, this.delay);
      }
    );
  }

  applyNewSubject(teacherWhoPropose: Teacher, subject: Subject): Observable<Subject[]> {
    return new Observable<Subject[]>(subscriber => {
      setTimeout(() => {
        this.teacherApplySubject.push({id: this.randId(), subject, teacherWhoPropose, wasApplied: 'none'});
        console.log('new subjects', this.teacherApplySubject);
        // return subjects can be applied
        const teacherHasSubjectsForTeacherWhoSentRequest = this.teacherHasSubject.filter(
          oneTeacherHasSubject => oneTeacherHasSubject.teacher.id === teacherWhoPropose.id
        );
        let response: Subject[] = [];
        response = this.subjects.filter(
          subject => !teacherHasSubjectsForTeacherWhoSentRequest.find(
            teacherHasSubject => {
              return teacherHasSubject.subject.id === subject.id;
            }
          )
        );
        response = response.filter(subj => !this.teacherApplySubject.find(
          application => subj.id === application.subject.id
        ));
        subscriber.next(response);
      }, this.delay);
    });
  }

  getGradesForTeacher(teacherWhoRequest: User): Observable<Grade[]> {
    return new Observable<Grade[]>(subscriber => {
      setTimeout(() => {
          subscriber.next(this.grades.filter(grade => grade.teacher.id === teacherWhoRequest.id));
        },
        this.delay);
    });
  }

  addNewGrade(grade: Grade) {
    setTimeout(() => {
      grade.id = this.randId();
      grade.date = new Date();
      this.grades.push(grade);
    }, this.delay);
  }
}
