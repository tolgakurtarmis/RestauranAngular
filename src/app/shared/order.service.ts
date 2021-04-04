import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderItem } from './order-item.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    formData:Order;
    orderItemModel:Array<OrderItem>=[];

  constructor(private http:HttpClient) { }


    saveOrder(){
      var body = {
        ...this.formData,
        OrderItemModal: this.orderItemModel
      }
      return this.http.post(environment.apiUrl +'api/Order/SaveOrder',body);
    }
}
