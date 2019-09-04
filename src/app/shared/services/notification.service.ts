import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar : MatSnackBar) { }

  config : MatSnackBarConfig = {
    duration : 2000,
    horizontalPosition : 'right',
    verticalPosition   : 'top',
    panelClass: 'red-snackbar'
    
  }

  openSnackBar(message : string) {
      this.snackbar.open(message ,'',this.config)
  }
}
