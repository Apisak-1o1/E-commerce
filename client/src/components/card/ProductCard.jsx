import React from "react";
import { ShoppingBasket } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state)=>state.actionAddtoCart)

  return (
    <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.8 }}
>
    <div className="border rounded-md shadow-md p-2 w-48">
      <div>
        {item.images && item.images.length > 0 ? (
          <img src={item.images[0].url} className="rounded-md w-full h-24 object-cover hover:scale-110 hover:duration-200"/>
        ) : (
          <div className="w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
            No Image
          </div>
        )}
      </div>

      <div className="py-2">
        <p className="text-xl truncate">{item.title}</p>
        <p className="text-sm truncate">{item.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-m font-bold">{numberFormat(item.price)}</span>
        <button className="bg-blue-500 rounded-md p-2 hover:bg-blue-600 shadow-md" onClick={()=> actionAddtoCart(item)}>
          <ShoppingBasket />
        </button>
      </div>
    </div>
    </motion.div>
  );
};

export default ProductCard;
