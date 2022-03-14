import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-facultydialog',
  templateUrl: './facultydialog.component.html',
  styleUrls: ['./facultydialog.component.scss']
})
export class FacultydialogComponent implements OnInit {
  facultyForm: FormGroup | any;
  actionButton = 'Save';
  headerText = 'Add';
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<FacultydialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.facultyForm = this.formBuilder.group({
      facultyName: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(48),
        Validators.pattern(/^[a-za-яёա-ֆ ,.'-]+$/i)
      ]]
    })

    if (this.editData) {
      this.actionButton = 'Edit';
      this.headerText = 'Edit';
      this.facultyForm.controls['facultyName'].setValue(this.editData.facultyName);
    }
  }

  addFaculty() {
    if (!this.editData) {
      if (this.facultyForm.valid) {
        this.facultyForm.value.groups = [];
        this.api.postFaculty(this.facultyForm.value)
          .subscribe({
            next: (res) => {
              alert("Faculty added successfully");
              this.facultyForm.reset();
              this.dialogRef.close('save');
            }
          })
      }
    } else {
      this.editFaculty();
    }
  }

  editFaculty() {
    if (this.facultyForm.valid) {
      this.api.patchFaculty(this.facultyForm.value, this.editData.id)
        .subscribe({
          next: (res) => {
            alert("Faculty updated successfully");
            this.facultyForm.reset();
            this.dialogRef.close('update');
          }
        })
    }
  }
}
