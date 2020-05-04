import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {NewTeacher} from "../../../../shared/interfaces";

@Component({
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrls: ['./new-teacher.component.scss']
})
export class NewTeacherComponent implements OnInit {
  // all new-pages teachers has field isApplied = false,
  // which we can change when emit applyAction in <app-new-pages-student>
  @Input() newTeacher: NewTeacher;
  @Output() onChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  emitSmth(event: MatButtonToggleChange) {
    this.onChange.emit(event.source.value);
  }
}
