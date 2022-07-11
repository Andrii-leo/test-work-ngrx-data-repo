import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  EntityDataService,
  EntityDefinitionService,
  ENTITY_METADATA_TOKEN,
} from "@ngrx/data";
import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "../../shared/shared.module";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersComponent } from "./orders/orders.component";
import {OrderDataService, orderEntityName, orderMetadata} from "./store";


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    EffectsModule.forFeature([]),
  ],
  providers: [
    { provide: ENTITY_METADATA_TOKEN, multi: true, useValue: orderMetadata },
  ],
})
export class OrdersModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    orderDataService: OrderDataService
  ) {
    eds.registerMetadataMap(orderMetadata);
    entityDataService.registerService(orderEntityName, orderDataService);
  }
}
