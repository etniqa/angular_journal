import { Pipe, PipeTransform } from '@angular/core';
import {Student} from "../interfaces";

@Pipe({
  name: 'searchBySurname'
})
export class SearchBySurnameStudentPipe implements PipeTransform {

  transform(students: Student[], surname: string): Student[] {
    return  students.filter((student) => student.surname.toLowerCase().includes(surname.toLowerCase()));
  }
}
