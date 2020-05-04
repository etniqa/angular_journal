import {Component, OnInit} from '@angular/core';
import {Group} from '../../../shared/interfaces';
import {DbService} from "../../../shared/services/db.service";

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  isLoaded = false;
  strForSearchGroupName = '';
  groups: Group[];

  constructor(private dbService: DbService) {
    this.getAllGroups();
  }

  ngOnInit(): void {
  }

  getAllGroups() {
    this.isLoaded = false;
    this.dbService.getAllGroups().subscribe(responseGroups => {
      this.groups = responseGroups;
      this.isLoaded = true;
    });
  }

  deleteGroup(groupForDelete: Group) {
    this.isLoaded = false;
    this.dbService.deleteGroup(groupForDelete).subscribe(updatedGroups => {
      this.groups = updatedGroups;
      this.isLoaded = true;
    });
  }
}
