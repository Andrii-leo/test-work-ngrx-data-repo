import { createAction, props } from "@ngrx/store";
import { OrderTableView } from "../../../shared/models/order.model";
import { PatientTableView } from "../../../shared/models/patient.model";

export const addFavoriteOrderView = createAction(
  "[Favorites] Add Favorites OrderView",
  props<{ order: OrderTableView }>()
);

export const removeFavoriteOrderView = createAction(
  "[Favorites] Remove Favorites OrderView",
  props<{ order: OrderTableView }>()
);

export const addFavoritePatientView = createAction(
  "[Favorites] Add Favorites PatientView",
  props<{ patient: PatientTableView }>()
);

export const removeFavoritePatientView = createAction(
  "[Favorites] Remove Favorites PatientView",
  props<{ patient: PatientTableView }>()
);
