import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import {
  selectFavoriteOrders,
  selectFavoriteOrdersIsEmpty,
  selectFavoritePatients,
  selectFavoritePatientsIsEmpty
} from "../store";

@Component({
  selector: "st-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  favoriteOrdersView$ = this.store.select(selectFavoriteOrders);
  favoriteOrderTableIsEmpty$ = this.store.select(selectFavoriteOrdersIsEmpty);

  favoritePatientsView$ = this.store.select(selectFavoritePatients);
  favoritePatientsTableIsEmpty$ = this.store.select(selectFavoritePatientsIsEmpty);

  constructor(private store: Store) {}
}
