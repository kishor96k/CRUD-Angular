import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupFom!: FormGroup;
  constructor(private builder: FormBuilder, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.signupFom = this.builder.group({
      fullname: ['', [Validators.required, Validators.minLength(4)]],
      mobile: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    })
  }


  SignUpData() {
    
      this.http.post<any>("http://localhost:3000/signupusers", this.signupFom.value).subscribe((res) => {
        console.log(res);
        alert("Sign Up Successfully");
        this.signupFom.reset({});
        this.route.navigate(['login']);

      }, err => {
        console.log(err);
        alert("Something went wrong")
      })
    }
  



}
