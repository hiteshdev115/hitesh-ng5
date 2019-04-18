import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

//import {UserComponent} from '../user.component';

export interface DialogData {
	head: string;
	title: string;
  desc:string;
  eid:number;
}


@Component({
  selector: 'app-dialog-body',
  //selector: 'app-root',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})



export class DialogBodyComponent implements OnInit {
  id:any;
  constructor(
    //userComponent: UserComponent,
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
    { 
      
    }

  ngOnInit() {
    
  }
  close() {
    this.dialogRef.close();
  }
  doDelete(id:any)
  {
    console.log('======>'+id);
    //this.userComponent.deleteEmployee(id);
    //this.userComponent.fetchEmployeeData();

  }
  
}
