import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
depositForm= this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
})

acno1=""
pswd1=""
amount1=""
withdrawalForm=this.fb.group({
  acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd1:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
  amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]

})
user=""
acno=""
lDate:any


  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
this.lDate= new Date()
    if(localStorage.getItem("currentUserName")) 

    {this.user=JSON.parse(localStorage.getItem("currentUserName")|| "")
  }}

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("please log in")
      this.router.navigateByUrl("")

    }
  }

  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUserName")

    localStorage.removeItem("token")


    this.router.navigateByUrl("")
  }
deposit(){
  var acno=this.depositForm.value.acno
  var pswd=this.depositForm.value.pswd
  var amount=this.depositForm.value.amount
  if(this.depositForm.valid){
   this.ds.deposit(acno,pswd,amount)
   .subscribe((result:any)=>{
     if(result){
       alert(result.message)
     }
   },(result)=>{
     alert(result.error.message)
     
   }
   )
}else
{alert("invalid form")}}

withdrawal(){
var acno = this.withdrawalForm.value.acno1
var pswd=this.withdrawalForm.value.pswd1
var amount= this.withdrawalForm.value.amount1
if(this.withdrawalForm.valid){
this.ds.withdrawal(acno,pswd,amount)
.subscribe((result:any)=>{
  if(result){
    alert(result.message)
  }
},(result)=>{
  alert(result.error.message)
  
})}
else{
  alert("invalid form")
}
}

deleteFromParent(){
  this.acno=JSON.parse(localStorage.getItem("currentAcno")||"")
}
delete(event:any){
  this.ds.delete(event)
  .subscribe((result:any)=>{
    if(result){
      alert(result.message)
      this.router.navigateByUrl("")
    }

    }
    ,
    (result)=>{
      alert(result.error.message)
    
  })
}
cancel(){
  this.acno=""
}

}




