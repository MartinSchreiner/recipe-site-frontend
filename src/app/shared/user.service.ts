import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };
  
  noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'True'})}

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post( environment.userAPIurl + '/register', user, this.noAuthHeader);
  }

  signIn(authCredentials){
    return this.http.post(environment.userAPIurl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getProfile(){
    return this.http.get(environment.userAPIurl + '/profile')
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token = localStorage.getItem('token');
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else{
      return null;
    }
  }

  isSignedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload){
      return userPayload.exp > Date.now()/1000;
    }else{
      return false;
    }
  }
}
