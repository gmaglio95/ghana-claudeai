export interface WeRoadPrice {
  EUR: number;
  CHF?: number;
}

export interface WeRoadCoordinator {
  id: string;
  firstName: string;
  lastName: string;
  city?: string;
  shortDescription?: string;
}

export interface WeRoadBookingPillars {
  freeCancellation: boolean;
  bookWithDeposit: boolean;
  interestFreeInstallments: boolean;
  flexibleCancellation: boolean;
}

export interface WeRoadGroupInfo {
  interestedCount?: number;
  expectedGroupSizeCount?: number;
}

export interface WeRoadTravel {
  id: string;
  title: string;
  slug: string;
  numberOfDays: number;
  startingPlace: string;
}

export interface WeRoadTour {
  id: string;
  startingDate: string;
  endingDate: string;
  price: WeRoadPrice;
  basePrice: WeRoadPrice | null;
  depositPrice: WeRoadPrice;
  discountPercentage: number | null;
  salesStatus: string;
  coordinator: WeRoadCoordinator | null;
  seatsToConfirm: number | null;
  freeSeats: number | null;
  groupInfo: WeRoadGroupInfo;
  bookingPillars: WeRoadBookingPillars;
  travel: WeRoadTravel;
}

export interface WeRoadResponse {
  response: string;
  data: WeRoadTour[];
}