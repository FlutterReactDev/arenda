export interface ObjectTableType {
  announcement: {
    id: number;
    image: string;
    fullAddress: string;
    name: string;
  };

  calendar: boolean;
  todayPrice: number;
}

export interface RoomTableType {
  announcement: {
    id: number;
    image: string;
    name: string;
  };
  calendar: boolean;
  todayPrice: number;
}
