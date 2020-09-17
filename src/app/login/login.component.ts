import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'login for stuff';
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  onSuccessfulLogin(res) {
    //jwt token can be sotored as a cookie beacuse it's the 2nd safest option
    //localstorage or sessionstorege would be the worst because they can be accessed through javascript and they are deleted on redirecting
    //cookies are automatically sent with each request already
    //in-memory storage would be the safest way
    //https://mannharleen.github.io/2020-03-19-handling-jwt-securely-part-1/
    this.cookie.set('id', res);
    this.router.navigate(['home']);
  }

  onSubmit(loginFormData) {
    let url = 'http://localhost:8080/authentication';
    this.http.post<any>(url,
      {
        username: loginFormData.username,
        password : loginFormData.password
      }
    ).subscribe(res => this.onSuccessfulLogin(res), error => console.log(error)); { 
    };
  }
}

