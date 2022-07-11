import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { OrderTableView } from "../../models/order.model";
import {addFavoriteOrderView, removeFavoriteOrderView} from "../../../features/favorite/store";

@Component({
  selector: "st-order-table",
  templateUrl: "./order-table.component.html",
  styleUrls: ["./order-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTableComponent implements AfterViewInit, OnChanges {
  displayedColumns: string[] = [
    "id",
    "patient",
    "creator",
    "status",
    "creationDate",
    "isFavorite",
  ];
  dataSource: MatTableDataSource<OrderTableView>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() orders: OrderTableView[] = [];

  constructor(private store: Store, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.updateTableData() ;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orders) {
      this.cdRef.markForCheck();

      this.updateTableData() ;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addToFavorite(order: OrderTableView) {
    this.store.dispatch(addFavoriteOrderView({ order }));
  }

  removeFromFavorite(order: OrderTableView) {
    this.store.dispatch(removeFavoriteOrderView({ order }));
  }

  updateTableData() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
