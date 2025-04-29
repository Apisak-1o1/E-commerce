import { create } from "zustand";
import axiosInstance from "../../axiosInstance";
import {persist,createJSONStorage} from 'zustand/middleware'
import { listCategory } from "../api/Category";
import { listProduct } from "../api/Product";

const ecomStore = (set) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  actionLogin: async (form) => {
    const res = await axiosInstance.post("login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
    getCategory : async (token) => {
      try {
        const res = await listCategory(token);
        set({categories :res.data})
      } catch (error) {
        console.log("🚀 ~ getCategory ~ error:", error);
      }
    },
    getProduct : async (token,count) => {
      try {
        const res = await listProduct(token,count);
        set({products :res.data})
      } catch (error) {
        console.log("🚀 ~ getCategory ~ error:", error);
      }
    }
});

const usePersist = {
    name: 'ecom-store',
    Storage: createJSONStorage(()=>localStorage)
}

const useEcomStore = create( persist(ecomStore,usePersist));

export default useEcomStore;
