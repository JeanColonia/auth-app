import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { RegiesterComponent } from './pages/regiester/regiester.component';

const routes: Routes = [

  {
    path:'',
    component: MainComponent,
    children:[
      {path: 'login', component:LoginComponent},
      {path: 'register', component:RegiesterComponent},
      {path: '**', redirectTo:'login'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
