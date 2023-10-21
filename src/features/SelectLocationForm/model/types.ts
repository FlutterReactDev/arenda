import { Option } from "@shared/ui/SelectSearch";

export interface AddObjectForm {
  object: ObjectValue;
  objectType: number | undefined;
  country: Option | undefined;
  region: Option | undefined;
  city: Option | undefined;
}

export enum ObjectValue {
  ROOM = 0,
  APARTAMENTS = 1,
  HOUSES = 2,
  SEPARATE_ROOMS = 3,
}
