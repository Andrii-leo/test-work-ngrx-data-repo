import { createFeatureSelector, createSelector } from "@ngrx/store";
import { favoritesModuleName, FavoritesState } from "./favorite.reducers";

const selectFavoritesState =
  createFeatureSelector<FavoritesState>(favoritesModuleName);

export const selectFavoriteOrders = createSelector(
  selectFavoritesState,
  (state) => state?.orders || []
);

export const selectFavoriteOrdersIsEmpty = createSelector(
  selectFavoritesState,
  (state) => !state.orders.length
);

export const selectFavoritePatients = createSelector(
  selectFavoritesState,
  (state) => state?.patients || []
);

export const selectFavoritePatientsIsEmpty = createSelector(
  selectFavoritesState,
  (state) => !state.patients.length
);
