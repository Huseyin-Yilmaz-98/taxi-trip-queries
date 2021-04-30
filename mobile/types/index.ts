export type Zone = {
  borough: string;
  id: number;
  latitude: number;
  longitude: number;
  zone: string;
};

export type Trip = {
  congestionSurcharge: number;
  distance: number;
  dropOffZone: Zone;
  droppedOffAt: string;
  extra: number;
  fareAmount: number;
  id: number;
  improvementSurcharge: number;
  mtaTax: number;
  passengerCount: number;
  pickUpZone: Zone;
  pickedUpAt: string;
  tip: number;
  tolls: number;
  totalAmount: number;
  tripDate: string;
};
