interface DentistItem {
  _id: string;
  name: string;
  hospital: string;
  address: string;
  expertist: string;
  tel: string;
  picture: string;
  __v: number;
  id: string;
}

interface DentistsJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: DentistItem[];
}

interface DentistJson {
  success: boolean;
  data: DentistItem;
}

interface BookingJson {
  succcess: boolean;
  data: BookingItem;
}

interface BookingsJson {
  success: boolean;
  count: number;
  data: BookingItem[];
}

interface BookingItem {
  _id: string;
  bookingDate: string;
  user: User;
  dentist: DentistItem;
  createdAt: string;
  __v: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}
