import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RenterRegistrationForm } from 'src/app/models/register-form';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public registerUser(registerFormValue: RenterRegistrationForm): Observable<any> {
    return this.http.post(`${environment.url}/api/users/register/landlord`, registerFormValue);
  }

  public loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.url}/auth/login`, { username, password });
  }
}
