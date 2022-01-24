import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //variable declaration
  aim="Your perfect banking partner "
  accno="Account number please"
  //values holding acno
  acno=""
  pswd=""
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]] ,
    
  })
  
  // creating database should be above constructor
  // users:any={
  //   1000:{acno:1000,uname:"Neil",password:"1000",balance:5000},
  //   1001:{acno:1001,uname:"Ram",password:"1001",balance:5000},
  //   1002:{acno:1002,uname:"Ammu",password:"1002",balance:5000},

  // }
  //for services


  // DEPENDENCY INJECTION
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder)
   {

    }

  ngOnInit(): void {
  }
// user defining functions at last
acnoChange(event:any){
  this.acno=event.target.value
console.log(this.acno);

}

pswdChange(event:any){
  this.pswd=event.target.value
console.log(this.pswd);

}

login(){
  var acno=this.loginForm.value.acno
  var password = this.loginForm.value.pswd
  let result=this.acno
  if(this.loginForm.valid){
    let result=this.ds.login(acno,password)
    if(result){
    alert("login successful")
    this.router.navigateByUrl('dashboard')
  }
}
else{
  alert("invalid form")
}}

//template referance variable......a,p

// login(a:any,p:any){
//   // console.log(a);
  
//   var acno=a.value
//   var password = p.value
//   let database = this.users

//   if(acno in database){
//     if(password == database[acno]["password"]){
//       alert("login success")
//     }
//     else{alert("incorrect password")}
//   }
//   else{alert("invalid account number")}
  
// }

 }
