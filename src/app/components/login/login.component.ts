import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private builder: FormBuilder, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  loginData() {
    this.http.get<any>("http://localhost:3000/signupusers").subscribe((res)=>{
      console.log(res);
      const user=res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      if(user){
        alert("Login Success");
        this.loginForm.reset({});
        this.route.navigate(['crud']);
      }
      else{
        alert("id n pas is not valid");
        this.loginForm.reset({});
      }
      
    },err=>{
      console.log(err);
      alert("Something is wrong");
    })

  }


  
}
