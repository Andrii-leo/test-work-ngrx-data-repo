import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FavoritesComponent } from "./orders/favorites.component";

const routes: Routes = [
  {
    path: "",
    component: FavoritesComponent,
    data: { title: "stms.menu.favorites" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
