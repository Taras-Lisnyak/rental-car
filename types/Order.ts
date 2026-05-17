export interface RentalFormData {
  carId: string;
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
}

export interface OrderResponse {
  orderId: string;
  status: string; 
  carId: string;
}
