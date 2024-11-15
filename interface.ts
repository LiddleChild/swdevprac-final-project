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

interface BookingItem {
  name: string;
  surname: string;
  id: string;
  hospital: string;
  bookDate: string;
}
