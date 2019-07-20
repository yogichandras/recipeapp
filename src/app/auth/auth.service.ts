import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {UserModel} from "./user.model";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  constructor(private http:HttpClient,private router:Router){}

  signUp(email: string,password: string){
   return this.http.post<AuthResponseData>(
     'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCJ3cs8tu3Yv8k5uPy0GFMTXvOjn1jYlok',
     {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(
      resData => {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
      }
   ));
  }

  logIn(email: string, password: string){
   return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCJ3cs8tu3Yv8k5uPy0GFMTXvOjn1jYlok',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap(
     resData => {
       this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
     }
   ));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
   const userData: {
     email: string;
     id: string;
     _token: string;
     _tokenExpirationDate: string;
   } = JSON.parse(localStorage.getItem('userData'));
   if(!userData){
     return;
   }
   const loadedUser = new UserModel(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

   if (loadedUser.token){
     this.user.next(loadedUser);
     const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
     this.autoLogout(expirationDuration);
   }

  }

  autoLogout(expirationDuration: number){
  console.log(expirationDuration);
    this.tokenExpirationTimer =  setTimeout(() =>{
      this.logout();
    } , expirationDuration)
  }

  private handleAuthentication(email:string,localId:string,token:string,expiresIn:number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new UserModel(email,localId,token,expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));

  }
}
