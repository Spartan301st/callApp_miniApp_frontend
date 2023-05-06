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

export interface StoreState {
  data: [] | User[];
  loading: boolean;
  hasErrors: boolean;
  fetchData: () => void;
  putData: (data: UserFormValues) => void;
  removeData: (userId: number) => void; // Here
}
