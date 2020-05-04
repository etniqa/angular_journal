import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Teacher} from '../../interfaces';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  @Input() teacher: Teacher;
  @Input() ind: number;
  @Output() deleteTeacher: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
