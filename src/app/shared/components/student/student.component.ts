import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../../interfaces';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  @Input() student: Student;
  @Input() ind: number;
  @Input() isShowDeleteButton = false;

  @Output() deleteStudent: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
  }
}
