import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/shared/order-item.model';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderModel :Order = new Order();
  orderItemModel :Array<OrderItem> = new Array<OrderItem>();
  constructor(private orderService: OrderService ,
            private dialog:MatDialog) { }

  ngOnInit(): void {
  }


  AddOrEditOrderItem(orderItemIndex,orderId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose=true;
    dialogConfig.width="100px";
    dialogConfig.height="200px";
    dialogConfig.data={orderItemIndex,orderId};    
    this.dialog.open(OrderItemsComponent);
  }

}
