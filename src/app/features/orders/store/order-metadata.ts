import {EntityMetadataMap} from "@ngrx/data";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {Order} from "../../../shared/models/order.model";

export const orderEntityName = "Order";

export const orderMetadata: EntityMetadataMap = {
    Order: {},
};

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();
