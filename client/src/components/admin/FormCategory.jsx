/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { createCategory, removeCategory } from "../../api/Category";
import { Plus,CircleMinus  } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const category = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  const [name, setName] = useState("");
  // const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please Insert Name");
    }
    try {
      const res = await createCategory(token, { name });
      toast.success(`Add Category ${res.data.name} Success`);
      getCategory(token)
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRemove = async (item) => {
    try {
        const res = await removeCategory(token,item.id)
      toast.success(`Add Category ${item.name} Success`);
      getCategory(token)
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container flex justify-center min-h-screen bg-gray-100">
      <div className="my-5">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Category Management
        </h1>
        <form action="" className="flex">
          <div className="relative">
            <input
              type="text"
              id="cate-name"
              name="cate-name"
              placeholder=" "
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="cate-name"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Category Name
            </label>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/4 flex bg-green-600 text-white justify-center items-center rounded hover:bg-green-700 ml-1"
          >
            <Plus />
          </button>
        </form>

        <hr />
        <ul className="list-none">
          {category.map((item, index) => (
            <li key={index} className="flex justify-between m-1">
              {item.name}
              <button
                type="submit"
                onClick={()=>handleRemove(item)}
                className="w-1/5 flex bg-red-400 text-white justify-center items-center rounded hover:bg-red-700 ml-1"
              >
                <CircleMinus  />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormCategory;
