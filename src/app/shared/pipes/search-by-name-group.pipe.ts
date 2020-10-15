import {Pipe, PipeTransform} from '@angular/core';
import {Group} from '../interfaces';

@Pipe({
  name: 'searchByNameGroup'
})
export class SearchByNameGroupPipe implements PipeTransform {

  transform(groups: Group[], name: string): Group[] {
    return groups.filter((group) => group.name.toLowerCase().includes(name.toLowerCase()));
  }
}
