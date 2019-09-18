import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService : AuthService,
                private router      : Router) { }

    canActivate(route : ActivatedRouteSnapshot,
                state : RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
                 return this.authService.isAdmin()
                        .pipe(map((isAdmin) => {
                            if(isAdmin) {
                                return true
                            }
                            else {
                                this.router.navigate(['/'])
                            }
                        })) 
                }


} // End of AuthGuard Class