import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../../shared/shared.module";
import { FavoritesRoutingModule } from "./favorites-routing.module";
import { FavoritesComponent } from "./orders/favorites.component";
import { favoritesModuleName, favoritesReducer } from "./store";

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    SharedModule,
    FavoritesRoutingModule,
    StoreModule.forFeature(favoritesModuleName, favoritesReducer),
  ],
})
export class FavoritesModule {}
