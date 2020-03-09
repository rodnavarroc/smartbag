import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate, CanActivateChild, CanLoad {
  
  constructor(private AFauth : AngularFireAuth, private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.AFauth.authState.pipe(map( auth => {
      
      if(isNullOrUndefined(auth))
      {
        return true;
      }
      else
      {
        this.router.navigate(['/home']);
        return false;
      }
    }))
    
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
