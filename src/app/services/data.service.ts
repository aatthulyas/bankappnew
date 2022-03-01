import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

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
  constructor(private http:HttpClient) { 
    // this.getDetails()
  }
  // store to local storage
  // saveDetails(){
  //   if(this.users){
  //     localStorage.setItem("userDb",JSON.stringify(this.users))
  //   }
  //   if(this.currentUserName){
  //     localStorage.setItem("cUserName",JSON.stringify(this.currentUserName))

  //   }
  //   if(this.currentAcno){
  //     localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
  //   }
  // }
//   // to get from local storage
//   getDetails(){
//     if(localStorage.getItem("userDb")){
//       //parsing since its not string stored as key .....avoiding error by null
//       this.users=JSON.parse(localStorage.getItem("userDb")||'')
//     }
//     if(localStorage.getItem("cUserName")){
//       this.currentUserName=JSON.parse(localStorage.getItem("cUserName")||'')
//   }
//   if(localStorage.getItem("currentAcno")){
//     this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
// }

//   }
getTransaction(acno:any){
  const data={

  }
  return this.http.post('http://localhost:3000/getTransaction/'+acno,data,this.getOptions())


  }

  
  register(acno:any,password:any,uname:any){
    const data={
      acno,
      password,
      uname
    }
    //asynchronous
return this.http.post('http://localhost:3000/register',data)
  }
  login(acno:any,password:any){
    const data={
      acno,password
    }
    //async
    return this.http.post('http://localhost:3000/login',data)
  
  }
  deposit(acno:any,password:any,amt:any){
    const data={
      acno,password,amt
    }
    //async
    return this.http.post('http://localhost:3000/deposit',data,this.getOptions())
  }

  //add token t0 request header
  getOptions(){
    const token=JSON.parse(localStorage.getItem("token")||'')
    let headers=new HttpHeaders()
    if(token){
    headers=headers.append('x-access-token',token)
    options.headers=headers}
  return options

  }
  withdrawal(acno:any,password:any,amt:any){
    const data={
      acno,password,amt
    }
    //async
    return this.http.post('http://localhost:3000/withdrawal',data,this.getOptions())
  }
  delete(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
  }

}
