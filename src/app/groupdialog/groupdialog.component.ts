import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-groupdialog',
  templateUrl: './groupdialog.component.html',
  styleUrls: ['./groupdialog.component.scss']
})
export class GroupdialogComponent implements OnInit {
  @ViewChild('groupName') groupName: any

  groupForm: FormGroup | any;
  facultiesArray: any = [];
  defaultValue: any;
  actionButton = 'Save';
  headerText = 'Add';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<GroupdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.getAllFaculties();
    this.groupForm = this.formBuilder.group({
      faculty: ['', Validators.required],
      groupName: ['', Validators.required]
    })

    if (this.editData) {
      this.actionButton = 'Edit';
      this.headerText = 'Edit';
      this.groupForm.get('faculty').clearValidators();
      let currentGroup = this.editData.groups.filter((element: any) => {
        return element.id == this.dialogRef.id
      })
      currentGroup.map((item: any) => {
        this.groupForm.controls['groupName'].setValue(item.name);
      })
    }
    this.defaultValue = this?.dialogRef?.componentInstance?.editData?.facultyName;
  }

  addGroup() {
    if (!this.editData) {
      class Data {
        constructor(public name: any, public id: any) {
          this.name = name,
            this.id = id
        }
      }
      this.facultiesArray.map((data: any) => {
        if (data.id == this.groupForm.controls['faculty'].value) {
          let id = data?.groups?.length + 1;
          data.groups.push(new Data(this.groupForm.value.groupName, id));
          if (this.groupForm.valid) {
            this.api.patchGroup(data, this.groupForm.controls['faculty'].value)
              .subscribe((res) => {
                alert("Group added successfully");
                this.groupForm.reset();
                this.dialogRef.close('save');
                window.location.reload();
              })
          }
        }
      })
    } else {
      this.editGroup();
    }
  }

  editGroup() {
    let allData = this.dialogRef.componentInstance.editData;
    let filterGroup = this.facultiesArray.filter((item: any) => {
      return item.id == allData.id;
    })[0].groups.map((elem: any, i: number) => {
      if (i == +this.dialogRef.id - 1) {
        allData.groups[i].name = this.groupName.nativeElement.value;
      }
    })
    if (this.groupForm.valid) {
      this.api.editGroup(allData, allData.id).subscribe({
        next: (res) => {
          alert("Group updated successfully");
          this.groupForm.reset();
          this.dialogRef.close('update');
        }
      })
    }  
  }
  
  getAllFaculties() {
    this.api.getFaculty().subscribe(data => {
      this.facultiesArray = data;
    });
  }
}
