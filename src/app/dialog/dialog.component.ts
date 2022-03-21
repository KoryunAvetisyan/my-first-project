import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  studentForm: FormGroup | any;
  actionButton = 'Save';
  headerText = 'Add';
  facultiesArray: any = [];
  groupsDataName: any = [];
  currentFacultiesArray: any = [];
  lengthOfcurrentFacultiesArray: number = 0;
  idForFilter: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }
  ngOnInit(): void {
    this.getAllFaculties();
    this.studentForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern(/^[a-za-яёա-ֆ ,.'-]+$/i),
        Validators.pattern(/^\S*$/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern(/^[a-za-яёա-ֆ ,.'-]+$/i),
        Validators.pattern(/^\S*$/)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]],
      faculty: ['', Validators.required],
      group: ['', Validators.required]
    });

    if (this.editData) {
      this.actionButton = 'Edit';
      this.headerText = 'Edit';
      this.studentForm.controls['firstName'].setValue(this.editData.firstName);
      this.studentForm.controls['lastName'].setValue(this.editData.lastName);
      this.studentForm.controls['phone'].setValue(this.editData.phone);
      this.studentForm.controls['email'].setValue(this.editData.email);
      this.studentForm.controls['faculty'].setValue(this.editData.faculty);
      this.studentForm.controls['group'].setValue(this.editData.group);
    }
    
    this.api.getFaculty().subscribe(data => {
      this.facultiesArray = data;
    });

  }
  addStudent() {
    if (!this.editData) {
      if (this.studentForm.valid) {
        this.api.postStudent(this.studentForm.value)
          .subscribe({
            next: (res) => {
              alert("Student added successfully");
              this.studentForm.reset();
              this.dialogRef.close('save');
            }
          })
      }
    } else {
      this.editStudent();
    }
  }

  editStudent() {
    if (this.studentForm.valid) {
      this.api.putStudent(this.studentForm.value, this.editData.id)
        .subscribe({
          next: (res) => {
            alert("Student updated successfully");
            this.studentForm.reset();
            this.dialogRef.close('update');
          }
        })
    }
  }
  
  sendId(id: any) {
    this.idForFilter = id;
    this.groupsDataName = [];
    this.facultiesArray.filter((faculty: any) => {
      return faculty.id == this.idForFilter;
    }).map((item: any) => {
      this.currentFacultiesArray.push(item.facultyName);
      this.lengthOfcurrentFacultiesArray++;
      if(this.currentFacultiesArray.length > 1 && this.currentFacultiesArray[this.lengthOfcurrentFacultiesArray] != this.currentFacultiesArray[this.lengthOfcurrentFacultiesArray - 1] && !this.editData){        
        this.studentForm.controls['group'].setValue('');
      }
      this.groupsDataName = item.groups;
    })
  }

  getAllFaculties() {
    this.api.getFaculty().subscribe(data => {
      this.facultiesArray = data;
    });
  }
}
