import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

 tokenValidate!:boolean;

  constructor(private authService:AuthService, private router:Router){

  }


  canActivate(): Observable<boolean> | boolean  {


    console.log('canActivate')
   return this.authService.validarToken()
   .pipe(
    tap(
      validate =>{
        if(!validate){
          this.router.navigateByUrl('/auth')
        }
      }
    )
   )


  }
  canLoad(): Observable<boolean> |  boolean  {
    console.log('canActivate')
    return this.authService.validarToken()
    .pipe(
      tap(
        validate =>{
          if(!validate){
            this.router.navigateByUrl('/auth')
          }
        }
      )
     )
  }
}
