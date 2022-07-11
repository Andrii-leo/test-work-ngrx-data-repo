import { EntityMetadataMap } from "@ngrx/data";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Patient } from "../../../shared/models/patient.model";

export const patientEntityName = "Patients";

export const patientMetadata: EntityMetadataMap = {
  Patients: {},
};

export const adapter: EntityAdapter<Patient> = createEntityAdapter<Patient>();
