import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { FacultydialogComponent } from '../facultydialog/facultydialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  displayedColumns: string[] = ['id', 'facultyName', 'action'];
  dataSource!: MatTableDataSource<any>;
  constructor(private dialog: MatDialog, private api: ApiService) { }
  ngOnInit(): void {
    this.getAllFaculties();
  }
  openFacultyDialog() {
    this.dialog.open(FacultydialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllFaculties();
      }
    })
  }

  getAllFaculties() {
    this.api.getFaculty()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
        }
      })
  }

  editFaculty(element: any) {
    this.dialog.open(FacultydialogComponent, {
      width: '50%',
      data: element
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllFaculties();
      }
    })
  }

  deleteFaculty(id: number) {
    this.api.deleteFaculty(id)
      .subscribe({
        next: (res) => {
          alert("Faculty deleted successfully");
          this.getAllFaculties();
        }
      })
  }
}
