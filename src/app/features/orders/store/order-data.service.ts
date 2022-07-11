import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Order } from "../../../shared/models/order.model";
import {orderEntityName} from "./order-metadata";

@Injectable({
  providedIn: "root",
})
export class OrderDataService extends DefaultDataService<Order> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super(orderEntityName, http, httpUrlGenerator);
  }

  getAll(): Observable<Order[]> {
    return super.getAll().pipe(
      map((ordersData) => (ordersData["order"] as Order[]) || []),
      map((orders) =>
        orders.map((order) => ({
          ...order,
          id: order.orderNum,
          isFavourite: false,
        }))
      )
    );
  }
}
