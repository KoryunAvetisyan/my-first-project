import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupdialogComponent } from '../groupdialog/groupdialog.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  panelOpenState = false;
  facultiesArray: any = [];
  displayedColumns: string[] = ['id', 'group'];
  dataSource!: MatTableDataSource<any>;
  constructor(private api: ApiService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getAllFaculties();
  }
  openDialog() {
    this.dialog.open(GroupdialogComponent, {
      width: '50%'
    })
  }

  editGroup(faculty: any, group: any) {
    this.dialog.open(GroupdialogComponent, {
      width: '50%',
      data: faculty,
      id: group.id
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllFaculties();
      }
    })
  } 

  deleteGroup(facultyId:any, groupId:any) {
    let filterGroup = this.facultiesArray.filter((item: any) => {
      return item.id == facultyId;
    })[0]?.groups.filter((elem: any) => {
      return elem.id != groupId;
    })
    this.api.deleteGroup({groups: filterGroup}, facultyId).subscribe({
      next: (res) => {
        alert("Group deleted successfully");
        this.getAllFaculties();
      }
    })
  }


  getAllFaculties() {
    this.api.getFaculty().subscribe(data => {
      this.facultiesArray = data;
    })
  }
}
