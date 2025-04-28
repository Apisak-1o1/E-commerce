import { create } from "zustand";
import axiosInstance from "../../axiosInstance";
import {persist,createJSONStorage} from 'zustand/middleware'

const ecomStore = (set) => ({
  user: null,
  token: null,
  actionLogin: async (form) => {
    const res = await axiosInstance.post("login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
});

const usePersist = {
    name: 'ecom-store',
    Storage: createJSONStorage(()=>localStorage)
}

const useEcomStore = create( persist(ecomStore,usePersist));

export default useEcomStore;
