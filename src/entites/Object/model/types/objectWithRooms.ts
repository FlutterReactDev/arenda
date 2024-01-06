import { ObjectResponse } from "./object";
import { RoomResponse } from "./room";

export interface ObjectWithRooms extends ObjectResponse {
  isHotel: boolean;
  rooms: RoomResponse[];
  objectPropertyName: string;
}
