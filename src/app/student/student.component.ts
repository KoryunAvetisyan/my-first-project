import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'faculty', 'group', 'action'];
  dataSource!: MatTableDataSource<any>;
  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllStudents();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllStudents();
      }
    })
  }

  getAllStudents() {
    this.api.getStudent()
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
      })
  }

  editStudent(element: any) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: element
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllStudents();
      }
    })
  }

  deleteStudent(id: number) {
    this.api.deleteStudent(id)
      .subscribe({
        next: (res) => {
          alert("Student deleted successfully");
          this.getAllStudents();
        }
      })
  }
}
