import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer:any

  constructor(private http:HttpClient, private router:Router) {}

  signup(email:string, password:string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhaeZwM7ZRdYhWPrmzBN4WBe5ynoQS6uI', {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError), tap(resDate => {
      this.handleAuthentication(resDate.email, resDate.localId, resDate.idToken, +resDate.expiresIn)
    }))
  }

  login(email:string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhaeZwM7ZRdYhWPrmzBN4WBe5ynoQS6uI', {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError), tap(resDate => {
      this.handleAuthentication(resDate.email, resDate.localId, resDate.idToken, +resDate.expiresIn)
    }))
  }

  logout(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  private handleAuthentication(email:string, token:string, userId:string, expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An unknown error ocurred!'
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage)
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS' :
        errorMessage = 'This email exists already!!';
      break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
      break;
      case 'USER_DISABLED' :
        errorMessage = 'This user account has been disabled'
    }
    return throwError(errorMessage)
  }

  autoLogin(){
    const userData:{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
    } = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if(loadedUser.token){
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    } , expirationDuration)
  }
}
