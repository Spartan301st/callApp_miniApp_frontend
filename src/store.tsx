import { create } from 'zustand'
import axios from "axios";
import { StoreState } from './types/types';


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
}));

export default useStore;
