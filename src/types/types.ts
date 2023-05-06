export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}
export interface UserFormValues {
  name: string;
  email: string;
  gender: string;
  street: string;
  city: string;
  phone: string;
}
export interface AntDesUser {
  key: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export interface AntDesTableData {
  name: string;
  email: string;
  gender: string;
  // street: string;
  // city: string;
  // address: {
  //   street: string;
  //   city: string;
  // };
  address: string;
  phone: string;
}

export interface StoreState {
  data: [] | User[];
  loading: boolean;
  hasErrors: boolean;
  fetchData: () => void;
  putData: (data: UserFormValues) => void;
  updateData: (data: UserFormValues, id: number) => void;
  removeData: (userId: number) => void;
}
