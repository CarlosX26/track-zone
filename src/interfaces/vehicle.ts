export interface IVehicle {
  id: string;
  plate: string;
  fleet: string | null;
  type: string;
  model: string;
  nameOwner: string;
  status: string;
  createdAt: string;
}
