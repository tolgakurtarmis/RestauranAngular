import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderModel :Order = new Order();
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

}
