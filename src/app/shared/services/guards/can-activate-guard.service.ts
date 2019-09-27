import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SharePointService } from '../sharepoint.service';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Injectable()
export class CanActivateGuard implements CanActivate {

    constructor(private sharepointService : SharePointService,
                private sharedService     : SharedService,
                private dialog            : MatDialog,
                private router      : Router) { }

    canActivate(route : ActivatedRouteSnapshot,
                state : RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
                
                 return this.sharepointService.GetUserSecurityGroups()
                        .pipe(map(securityGroups => {
                            if(securityGroups.includes("HR Portal ASC Process Leads")) {
                                return true
                            }
                            else {
                                this.sharedService.passMessage({message : "You do not have enough privileges"})
                                let dialogRef = this.dialog.open(DialogComponent)
                                dialogRef.afterClosed().subscribe(result => {
                                    if(result === 'true') {
                                        this.router.navigate(['/search'])
                                    }
                                })
                                
                                
                            }
                        }))
                }


} // End of AuthGuard Class