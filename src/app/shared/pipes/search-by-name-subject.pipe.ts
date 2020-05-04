import { Pipe, PipeTransform } from '@angular/core';
import {Group, Subject} from "../interfaces";

@Pipe({
  name: 'searchByNameSubject'
})
export class SearchByNameSubjectPipe implements PipeTransform {

  transform(subjects: Subject[], name: string): Subject[] {
    return  subjects.filter((subject) => subject.name.toLowerCase().includes(name.toLowerCase()));
  }

}
