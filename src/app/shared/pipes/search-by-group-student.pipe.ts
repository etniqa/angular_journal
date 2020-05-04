import { Pipe, PipeTransform } from '@angular/core';
import {Student} from "../interfaces";

@Pipe({
  name: 'searchByGroup'
})
export class SearchByGroupStudentPipe implements PipeTransform {

  transform(students: Student[], groupName: string): Student[] {
    return students.filter((student) => student.group.name.toLowerCase().includes(groupName.toLowerCase()));
  }
}
