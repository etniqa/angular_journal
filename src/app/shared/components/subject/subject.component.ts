import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student, Subject} from "../../interfaces";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  @Input() subject: Subject;
  @Input() ind: number;
  @Output() deleteSubject: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
