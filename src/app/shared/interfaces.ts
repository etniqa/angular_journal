

export interface User {
  id?: string;
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

export interface Admin extends User {}

export interface Subject {
  id: string;
  name: string;
}
export interface NewSubject {
  id: string;
  subject: Subject;
  teacherWhoPropose: Teacher;
  wasApplied: string;
}

// tslint:disable-next-line:no-empty-interface
export interface Student extends User{
  group: Group;
}
export interface StudentChoosing extends Student{
  isChosen: boolean;
}
export interface NewStudent extends Student{
  wasApplied: string;
}

// tslint:disable-next-line:no-empty-interface
export interface Teacher extends User{
}
export interface NewTeacher extends Teacher{
  wasApplied: string;
}

export interface Group {
  id?: string;
  name: string;
}

export interface Grade {
  id?: string;
  date?: Date;
  value: number;
  teacher: Teacher;
  subject: Subject;
  student: Student;
}

export interface TeacherHasSubject {
  id: string;
  teacher: Teacher;
  subject: Subject;
}
