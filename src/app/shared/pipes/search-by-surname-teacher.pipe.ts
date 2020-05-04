import { Pipe, PipeTransform } from '@angular/core';
import {Teacher} from "../interfaces";

@Pipe({
  name: 'searchBySurnameTeacher'
})
export class SearchBySurnameTeacherPipe implements PipeTransform {

  transform(teachers: Teacher[], surname: string): Teacher[] {
    return  teachers.filter((teacher) => teacher.surname.toLowerCase().includes(surname.toLowerCase()));
  }

}
