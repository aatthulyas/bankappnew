import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUserName:any
  currentAcno:any

  users:any={
    1000:{acno:1000,uname:"Neil",password:"1000",balance:5000,transaction:[]},
    1001:{acno:1001,uname:"Ram",password:"1001",balance:5000,transaction:[]},
    1002:{acno:1002,uname:"Ammu",password:"1002",balance:5000,transaction:[]}
  }
  constructor() { 
    this.getDetails()
  }
  getTransaction(){
  return  this.users[this.currentAcno].transaction
  }
  // store to local storage
  saveDetails(){
    if(this.users){
      localStorage.setItem("userDb",JSON.stringify(this.users))
    }
    if(this.currentUserName){
      localStorage.setItem("cUserName",JSON.stringify(this.currentUserName))

    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
  }
  // to get from local storage
  getDetails(){
    if(localStorage.getItem("userDb")){
      //parsing since its not string stored as key .....avoiding error by null
      this.users=JSON.parse(localStorage.getItem("userDb")||'')
    }
    if(localStorage.getItem("cUserName")){
      this.currentUserName=JSON.parse(localStorage.getItem("cUserName")||'')
  }
  if(localStorage.getItem("currentAcno")){
    this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
}

  }

  
  register(acno:any,password:any,uname:any){
    let db = this.users
    if(acno in db){
      return false
    }
    else{
      //since database is in key and value
      db[acno]={acno,
      uname,
    password,
  balance:0,
transaction:[]
}
  console.log(db);
  this.saveDetails()
  
  return true}

  }
  login(acno:any,password:any){
    let database= this.users
    if(acno in database){
      if(password == database[acno]["password"]){
        this.currentAcno=acno
        this.currentUserName=database[acno]["uname"]
        this.saveDetails()

return true       
      }
      else{alert("incorrect password")
    return false}
    }
    else{alert("invalid account number")
  return false}
  
  }
  deposit(acno:any,password:any,amt:any){
    //parseint to avoid concatanetion
    var amount =parseInt(amt)
    let db=this.users
    if(acno in db){
      
      if(password==db[acno]["password"]){

        db[acno]["balance"]= db[acno]["balance"] +amount
        db[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })
        this.saveDetails()

return db[acno]["balance"]}
  

      
      else{
        alert("wrong password")
        return false
      }

    }
    else
    {
      alert("account doesnot exist")
      return false
    }
  }

  withdrawal(acno:any,password:any,amt:any){
    //parseint to avoid concatanetion
    var amount =parseInt(amt)
    let db=this.users
    if(acno in db){
      
      if(password==db[acno]["password"]){
        // extra to chec sufficient amount
        if(db[acno]["balance"]>amount){

        db[acno]["balance"]= db[acno]["balance"] -amount
        db[acno].transaction.push({
          amount:amount,
          type:"DEBIT"
        })

        this.saveDetails()

return db[acno]["balance"]}
else{
  alert("insufficient balance")
  return false
}
      }
      else{
        alert("wrong password")
      }

    }
    else{
      alert("account doesnot exist")
      return false
    }
  }
}
