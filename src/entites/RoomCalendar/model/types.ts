export interface AvailabilityRequestData {
  roomId: number;
  availability: AvailibilityData;
}

export interface AvailibilityData {
  id: number;
  anObjectRoomId: number;
  startDate: Date;
  endDate: Date;
  comment: string;
  createdDate: Date;
  guestPhone: string;
  gusetName: string;
}
