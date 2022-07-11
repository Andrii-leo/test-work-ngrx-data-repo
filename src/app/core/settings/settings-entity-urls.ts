import { orderEntityName } from "../../features/orders/store";
import { patientEntityName } from "../../features/patients/store";

export const entityHttpResourceUrlsSettings = {
  [orderEntityName]: {
    entityResourceUrl: "https://api.mocki.io/v2/79fb05cb",
    collectionResourceUrl: "https://api.mocki.io/v2/79fb05cb",
  },
  [patientEntityName]: {
    entityResourceUrl: "https://api.mocki.io/v2/51597ef3",
    collectionResourceUrl: "https://api.mocki.io/v2/51597ef3",
  },
};
