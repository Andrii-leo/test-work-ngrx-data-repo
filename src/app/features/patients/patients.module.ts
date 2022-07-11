import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  EntityDataService,
  EntityDefinitionService,
  ENTITY_METADATA_TOKEN,
} from "@ngrx/data";
import { SharedModule } from "../../shared/shared.module";
import { PatientsRoutingModule } from "./patients-routing.module";
import { PatientsComponent } from "./patients/patients.component";
import {
  PatientDataService,
  patientEntityName,
  patientMetadata,
} from "./store";

@NgModule({
  declarations: [PatientsComponent],
  imports: [CommonModule, SharedModule, PatientsRoutingModule],
  providers: [
    { provide: ENTITY_METADATA_TOKEN, multi: true, useValue: patientMetadata },
  ],
})
export class PatientsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    orderDataService: PatientDataService
  ) {
    eds.registerMetadataMap(patientMetadata);
    entityDataService.registerService(patientEntityName, orderDataService);
  }
}
