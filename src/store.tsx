import { create } from 'zustand'
import axios from "axios";
import { StoreState, UserFormValues } from './types/types';


const useStore = create<StoreState>((set) => ({
  data: [],
  loading: false,
  hasErrors: false,
  fetchData: async () => {
    set(() => ({ loading: true }));

    try{
      const result = await axios.get("http://localhost:3000");
      set({ data: result.data });
    } catch (error) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
  putData: async (values: UserFormValues) => {
    try {
      const backendUpdatedData = await axios.post('http://localhost:3000/addUser', values);
      set({data: backendUpdatedData.data})
      
    } catch (error) {
      console.error(error);
    }
  },
  updateData: async (values: UserFormValues, id: number) => {
    try {
      const dataToUpdate = {id, ...values};
      const backendUpdatedData = await axios.post('http://localhost:3000/updateUser', dataToUpdate);
      set({data: backendUpdatedData.data}) 
    } catch (error) {
      console.error(error);
    }
  },
  removeData: async (userId: number) => {
    try {
      const backendUpdatedData = await axios.post('http://localhost:3000/deleteUser', {userId: userId});
      set({data: backendUpdatedData.data}) 
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useStore;
