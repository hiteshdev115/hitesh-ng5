import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


export interface DialogData {
	head: string;
	title: string;
  desc:string;
  Type:string;
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
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
    { 
      
    }

  ngOnInit() {
    
  }
  close() {
    this.dialogRef.close('close');
  }
  doDelete(id:any)
  {
    //console.log('======>'+id);
    this.dialogRef.close(id);

  }
  
}
