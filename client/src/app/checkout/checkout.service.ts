import { IDeliveryMethod } from './../shared/models/delivery-method';
import { map } from 'rxjs/operators';
import { IOrderToCreate } from './../shared/models/order';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders', order);
  }

  getDeliveryMethods() {
    return this.http.get(this.baseUrl + 'orders/deliveryMethods').pipe(
      map(
        (dm: IDeliveryMethod[]) => {
          return dm.sort((a, b) => b.price - a.price);
        }
      )
    );
  }
}
