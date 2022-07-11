import { createReducer, on } from "@ngrx/store";
import { OrderTableView } from "../../../shared/models/order.model";
import { PatientTableView } from "../../../shared/models/patient.model";
import {
  addFavoriteOrderView,
  addFavoritePatientView,
  removeFavoriteOrderView,
  removeFavoritePatientView,
} from "./favorite.actions";

export const favoritesModuleName = "favoritesModule";

export interface FavoritesState {
  orders: OrderTableView[];
  patients: PatientTableView[];
}

const initialState: FavoritesState = {
  orders: [],
  patients: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(removeFavoriteOrderView, (state, { order }): FavoritesState => {
    return {
      ...state,
      orders: state.orders
        .map((stateOrder) =>
          stateOrder.id === order.id
            ? { ...stateOrder, isFavorite: false }
            : stateOrder
        )
        .filter((stateOrder) => stateOrder.id !== order.id),
    };
  }),
  on(addFavoriteOrderView, (state, { order }): FavoritesState => {
    if (state.orders.find((stateOrder) => stateOrder.id === order.id)) {
      return state;
    }

    const newOrder = { ...order, isFavorite: true };
    return {
      ...state,
      orders: [...state.orders, newOrder],
    };
  }),
  on(removeFavoritePatientView, (state, { patient }): FavoritesState => {
    return {
      ...state,
      patients: state.patients
        .map((statePatient) =>
            statePatient.id === patient.id
            ? { ...statePatient, isFavorite: false }
            : statePatient
        )
        .filter((stateOrder) => stateOrder.id !== patient.id),
    };
  }),
  on(addFavoritePatientView, (state, { patient }): FavoritesState => {
    if (state.orders.find((patientOrder) => patientOrder.id === patient.id)) {
      return state;
    }

    const newPatient = { ...patient, isFavorite: true };
    return {
      ...state,
      patients: [...state.patients, newPatient],
    };
  })
);
