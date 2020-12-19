export type ListVehiclesResponse = Array<Vehicle> | void;
export type Vehicle = {
  id: number;
  description: string;
  make: string;
  model: string;
  estimatedate: string;
  image: string;
};
