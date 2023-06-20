import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regiester',
  templateUrl: './regiester.component.html',
  styles: [
  ]
})
export class RegiesterComponent {


  miForm:FormGroup = this.fb.group({
    nombre:['', [Validators.required]],
    email:['', [ Validators.required, Validators.email]],
    password: [ '', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService) { }

  register(){


    const {nombre, email, password} = this.miForm.value;

    this.authService.registro(nombre, email, password).subscribe(
      resp =>{

        if(resp.ok === true){
          this.router.navigateByUrl('/dashboard');
        }else{

          Swal.fire('Error', resp.msg, 'error');
        }
      }
    );




  }
}
