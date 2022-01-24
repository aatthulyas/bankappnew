import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
acno=""
pswd=""
amount=""
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
user=this.ds.currentUserName


  constructor(private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
deposit(){
  var acno=this.depositForm.value.acno
  var pswd=this.depositForm.value.pswd
  var amount=this.depositForm.value.amount
  if(this.depositForm.valid){
  let result= this.ds.deposit(acno,pswd,amount)
  if(result){
    alert(amount+" credited, new balance is: "+ result)
  }
}else
{alert("invalid form")}}

withdrawal(){
var acno = this.withdrawalForm.value.acno1
var pswd=this.withdrawalForm.value.pswd1
var amount= this.withdrawalForm.value.amount1
if(this.withdrawalForm.valid){
let result = this.ds.withdrawal(acno,pswd,amount)
if(result){
  alert(amount+" debited. New balance is : "+ result)
}

}
else{alert("invalid form")}
}}
