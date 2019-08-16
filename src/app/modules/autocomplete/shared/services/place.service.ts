import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Config } from '../config';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  /**
   * Makes a request to the Place Autocomplete API
   * to get a list of predictions
   * @param toSearch string
   * @param location string
   * @param sessiontoken string
   */
  public autocomplete(toSearch: string, location: string, sessiontoken: string, API_KEY: string) {
    return this.http.get(
      Config.apiUrl + `?input=${toSearch}&location=${location}&radius=500&key=${API_KEY}&sessiontoken=${sessiontoken}`
    ).pipe(catchError(this.handleErrors));
  }

  /**
  * Handles the error
  * @param error HttpErrorResponse
  * @return throwError
  */
  private handleErrors(error: HttpErrorResponse) {
    return throwError(error);
  }
}
