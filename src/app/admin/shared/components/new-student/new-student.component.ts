import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {Student} from '../../../../shared/interfaces';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {
  // all new-pages teachers has field isApplied = false,
  // which we can change when emit applyAction in <app-new-pages-student>
  @Output() onChange = new EventEmitter<string>();
  @Input() student: Student;
  constructor() { }

  ngOnInit(): void {
  }

  emitSmth(event: MatButtonToggleChange) {
    this.onChange.emit(event.source.value);
  }
}
