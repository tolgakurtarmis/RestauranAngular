import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/shared/order-item.model';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  isValid:boolean= true;
  customerList:Customer[];
  orderModel: Order = new Order();
  orderItemModel: Array<OrderItem> = new Array<OrderItem>();
  sOrderItemId:number;
  sOrderId:number;

  constructor(private orderService: OrderService,
    private dialog: MatDialog,
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.orderItemModel = this.orderService.orderItemModel;
    this.customerService.GetCustomerList().then(res=>this.customerList = res as Customer[]);
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.orderModel = {
      OrderId: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerId: 0,
      PaymentMethod: "",
      GrandTotal: 0
    };
  }

  AddOrEditOrderItem(orderItemIndex, orderId): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = { orderItemIndex, orderId };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }
  DeleteOrderItem(orderItemIndex, orderId) {
    this.orderService.orderItemModel.splice(orderItemIndex, 1);
    this.updateGrandTotal();
  }
  updateGrandTotal() {
    this.orderModel.GrandTotal = this.orderService.orderItemModel.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.orderModel.GrandTotal = parseFloat(this.orderModel.GrandTotal.toFixed(2));
  }
  validateForm(){
  this.isValid = true;
  if(this.orderModel.CustomerId == 0 || typeof this.orderModel.CustomerId === "undefined"){
    this.isValid = false;
  }
  // else if (this.orderItemModel.length == 0){
  //   this.isValid =false;
  // }
  return this.isValid;
  }
  onSubmit(form: NgForm){
    if(this.validateForm()){
      this.orderService.saveOrder().subscribe(res => {
        this.resetForm();
      });
    }
  }
}
