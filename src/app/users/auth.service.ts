import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  constructor(private http:HttpClient , private router : Router) { } 

  Token_Key = "token";
  Name_Key="name";

  get isAuthenticated(){
    return !!localStorage.getItem(this.Token_Key);
}
logout(){
  localStorage.removeItem(this.Token_Key);
  localStorage.removeItem(this.Name_Key);
}

  login(loginData: any){
    this.http.post(environment.apiUrl +'auth/login',loginData)
          .subscribe((res:any) => {
            var authResponse = res;
            if (authResponse != null){
              localStorage.setItem(this.Token_Key , authResponse.token);
              localStorage.setItem(this.Name_Key , authResponse.username);
              console.log(localStorage.getItem(this.Token_Key));
              this.router.navigate(['/']);

            }
          });
  }
}
