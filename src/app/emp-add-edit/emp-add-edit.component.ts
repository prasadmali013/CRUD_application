import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(private _fb: FormBuilder, 
    private _empService: EmployeeService,
     private _dialogRef: MatDialogRef<EmpAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService: CoreService
    ) {
    this.empForm = this._fb.group({
      name: '',
      salary: '',
      age: '',
      dob: ''
    })
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee updated sucessfully!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        })

      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added Successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
      
    }
  }

}
