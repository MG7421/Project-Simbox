// AuthfakeauthenticationService.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthfakeauthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public user= JSON.parse(sessionStorage.getItem('currentUser') || '{}')

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("currentUser") || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  }

  public  setCurrentUser() {
     this.currentUserSubject.next(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }


 public login(login: string, password: string, isLdapUser: boolean) {
    let request={ data: { login: login,  password: password,  isLdapUser: isLdapUser,}
  }
    return this.http.post<any>(`${environment.apiUrl}user/connexion`, request)
      .pipe( map((user:any) => { if(user && user.items && user.items.length){
            sessionStorage.setItem('currentUser', JSON.stringify(user.items[0]));
            this.currentUserSubject.next(user.items[0]);
          }
          return user;
        })
      );
  }


 public confirmLogin(otpCod: string){
    const req= { data: { otpCode: otpCod }}
    return this.http .post<any>(`${environment.apiUrl}user/validateNumberCodeOtp`, req)
      .pipe(  map((user:any) => { if(user && user.items && user.items.length){
           sessionStorage.setItem('currentUser', JSON.stringify(user.items[0]));
            this.currentUserSubject.next(user.items[0]);
          }
          return user;
        })
      );
  }

   public  logout() {
    const req= {   user: this.user.id,  data: {id: this.user.id} }
    console.log(this.user)
    return this.http .post<any>(`${environment.apiUrl}user/logOut`, req)
      .pipe( tap(() =>{ sessionStorage.removeItem('currentUser');
          this.currentUserSubject.next({});
        })
      )

  }


  public Réinitialisation(): Observable<any> {
    if (!this.currentUserValue || !this.currentUserValue.email) {
      return throwError('L\'utilisateur n\'est pas authentifié.'); // Gérez l'erreur comme vous le souhaitez.
    }
    const req = { email: this.currentUserValue.email };
    return this.http.post<any>(`${environment.apiUrl}user/resetPassword`, req).pipe(
      tap(response => {
        console.log('Réinitialisation réussie:', response);
      }),
      catchError(this.handleError)
    );
  }

  private handleSessionStorage(user: any) {
    if (user && user.items && user.items.length) {
      sessionStorage.setItem('currentUser', JSON.stringify(user.items[0]));
      this.currentUserSubject.next(user.items[0]);
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s’est produite', error);
    return throwError(() => new Error('Une erreur s’est produite lors de la communication avec le serveur'));
  }
}
