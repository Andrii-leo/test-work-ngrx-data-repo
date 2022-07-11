import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { EntityCollectionService, EntityServices } from "@ngrx/data";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import { Order, OrderTableView } from "../../../shared/models/order.model";
import { selectFavoriteOrders } from "../../favorite/store";
import { orderEntityName } from "../store";

@Component({
  selector: "st-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  orderService: EntityCollectionService<Order>;
  ordersTableView$: Observable<OrderTableView[]>;
  loading$: Observable<boolean>;
  favoriteOrdersView$ = this.store.select(selectFavoriteOrders);

  constructor(
    private entityServices: EntityServices,
    private store: Store
  ) {
    this.orderService =
      entityServices.getEntityCollectionService(orderEntityName);
    this.loading$ = this.orderService.loading$;
  }

  ngOnInit() {
    this.ordersTableView$ = combineLatest([
      this.orderService.entities$,
      this.favoriteOrdersView$,
    ]).pipe(
      map(([orders, favorites]) => {
        return orders.map((order) => {
          return {
            id: order.orderNum,
            patient: order.patient.fullName,
            creator: order.creator?.name || "-",
            status: order.status?.name || "-",
            creationDate: order.creationDate?.formattedDate,
            isFavorite: !!favorites.find(
              (favoriteOrder) => favoriteOrder.id === order.orderNum
            ),
          };
        });
      })
    );
  }

  getOrders() {
    this.orderService.getAll();
  }
}
