import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { EntityCollectionService, EntityServices } from "@ngrx/data";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import {
  Patient,
  PatientTableView,
} from "../../../shared/models/patient.model";
import { selectFavoritePatients } from "../../favorite/store";
import { PatientService } from "../patient.service";
import { patientEntityName } from "../store";

@Component({
  selector: "st-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  patientEntityService: EntityCollectionService<Patient>;
  patientsTableView$: Observable<PatientTableView[]>;
  loading$: Observable<boolean>;
  favoritePatientsView$ = this.store.select(selectFavoritePatients);

  constructor(
    private entityServices: EntityServices,
    private store: Store,
    private patientService: PatientService
  ) {
    this.patientEntityService =
      entityServices.getEntityCollectionService(patientEntityName);
    this.loading$ = this.patientEntityService.loading$;
  }

  ngOnInit() {
    this.patientsTableView$ = combineLatest([
      this.patientEntityService.entities$,
      this.favoritePatientsView$,
    ]).pipe(
      map(([patients, favorites]) => {
        return patients.map((patient) => {
          return {
            id: patient.code,
            patientName: patient.fullName,
            age: this.patientService.calculateAgeFromData(
              patient.birthDate?.formattedDate
            ),
            searchedBy: patient.searchedBy?.name,
            phone: patient.address.phone1 || patient.address.phone2 || "-",
            isFavorite: !!favorites.find(
              (favoritePatient) => favoritePatient.id === patient.code
            ),
          };
        });
      })
    );
  }

  getPatients() {
    this.patientEntityService.getAll();
  }
}
