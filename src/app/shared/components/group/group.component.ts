import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group, Subject} from '../../interfaces';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() group: Group;
  @Input() ind: number;
  @Output() deleteGroup: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
