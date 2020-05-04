import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {NewSubject} from "../../../../shared/interfaces";

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.scss']
})
export class NewSubjectComponent implements OnInit {
  @Input() newSubject: NewSubject;
  @Output() onChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  emitSmth(event: MatButtonToggleChange) {
    this.onChange.emit(event.source.value);
  }

}
