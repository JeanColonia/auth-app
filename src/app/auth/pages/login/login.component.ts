import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miForm: FormGroup = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService) { }


get usuario(){
  return this.authService.usuario;
}

  login(){

    const { email, password} = this.miForm.value;

    this.authService.login(email, password)
    .subscribe(
      res =>{
        console.log(res)
       if(res===true){
        this.router.navigateByUrl('/dashboard');
       } else{
        Swal.fire('Error', res, 'error');

       }
      }
    );

  }
}
