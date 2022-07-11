import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Patient } from "../../../shared/models/patient.model";
import { patientEntityName } from "./patient-metadata";

@Injectable({
  providedIn: "root",
})
export class PatientDataService extends DefaultDataService<Patient> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super(patientEntityName, http, httpUrlGenerator);
  }

  getAll(): Observable<Patient[]> {
    return super.getAll().pipe(
      map((patientsData) => (patientsData["patient"] as Patient[]) || []),
      map((patients) =>
        patients.map((patient) => ({
          ...patient,
          id: patient.code,
          isFavourite: false,
        }))
      )
    );
  }
}
