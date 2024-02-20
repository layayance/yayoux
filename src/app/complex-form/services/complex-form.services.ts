import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, delay, mapTo, Observable, of} from "rxjs";
import {ComplexFormValue} from "../models/complex-form-value.model";
import {environmentDev} from "../../environments/environment.dev";


@Injectable()
export class ComplexFormService {
  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post(`${environmentDev.apiUrl}/users`, formValue).pipe(
      mapTo(true),
      delay(800),
      catchError(() => of(false).pipe(
        delay(800)
      ))
    );
  }
}
