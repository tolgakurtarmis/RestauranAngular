import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { OrderItem } from 'src/app/shared/order-item.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData:OrderItem;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
               public dialogRef : MatDialogRef<OrderItemsComponent> ) { }

  ngOnInit(): void {
    this.formData={
      OrderItemId : null,
      OrderId:this.data.OrderId,
      ItemId:0,
      ItemName:'',
      Price:0,
      Quantity:0,
      Total:0
    }
  }

}
