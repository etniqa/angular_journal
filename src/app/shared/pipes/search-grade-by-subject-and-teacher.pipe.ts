import { Pipe, PipeTransform } from '@angular/core';
import {Grade} from '../interfaces';

@Pipe({
  name: 'searchGradeBySubjectAndTeacher'
})
export class SearchGradeBySubjectAndTeacherPipe implements PipeTransform {

  transform(grades: Grade[], subjectName: string, teacherSurname: string): Grade[] {
    return grades.filter(value => value.subject.name.toLowerCase().includes(subjectName.toLowerCase())
      && value.teacher.name.toLowerCase().includes(teacherSurname.toLowerCase()));
  }
}
