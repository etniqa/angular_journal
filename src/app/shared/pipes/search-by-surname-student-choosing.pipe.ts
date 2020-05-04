import { Pipe, PipeTransform } from '@angular/core';
import {StudentChoosing} from "../interfaces";


@Pipe({
  name: 'searchBySurnameExtended'
})
export class SearchBySurnameStudentChoosingPipe implements PipeTransform {

  transform(students: StudentChoosing[], surname: string): StudentChoosing[] {
    return  students.filter((student) => student.surname.toLowerCase().includes(surname.toLowerCase()));
  }

}
