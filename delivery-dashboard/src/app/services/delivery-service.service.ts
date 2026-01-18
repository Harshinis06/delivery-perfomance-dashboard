import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { DeliveryDetails } from '../models/delivery-details';

@Injectable({
  providedIn: 'root'
})
export class DeliveryServiceService {

  urls = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<DeliveryDetails[]> {
    return this.http.get<DeliveryDetails[]>(this.urls + 'deliveries').pipe(
      catchError(error => {
        console.error('Error fetching deliveries:', error);
        return throwError(() => error);
      })
    );
  }
}
