import React, { useState, useEffect } from "react";
import { Plus, Trash2, Wrench } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, listProduct, readProduct,updateProduct  } from "../../api/Product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initailState = {
  title: "Space Maraines",
  description: "Space Marines Figure",
  price: 1200,
  quantity: 5,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
    const {id}=useParams()
    const navigate = useNavigate()

  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);
  const [form, setForm] = useState(initailState);

  useEffect(() => {
    getCategory(token);
    fetchProduct(token,id,form)
  }, []);

  const fetchProduct = async(token,id,form)=>{
    try {
        const res = await readProduct(token,id,form)
        setForm(res.data)
    } catch (error) {
        console.log("🚀 ~ fetchProduct ~ error:", error)
    }
  }

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token,id, form);
      toast.success(`Add Product ${res.data.name} Succesfully`);
      navigate('/admin/product')
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return (
    <div className="container flex justify-center min-h-screen bg-gray-100">
      <div className="my-5">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Product Management
        </h1>
        <form action="" className="flex flex-col">
          <div className="relative my-1">
            <input
              type="text"
              name="title"
              value={form.title}
              placeholder=" "
              onChange={handleOnChange}
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="title"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Product Title
            </label>
          </div>

          <div className="relative my-1">
            <input
              type="text"
              name="description"
              value={form.description}
              placeholder=" "
              onChange={handleOnChange}
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="description"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Product Description
            </label>
          </div>

          <div className="relative my-1">
            <input
              type="number"
              name="price"
              value={form.price}
              placeholder=" "
              onChange={handleOnChange}
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="price"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Product Price
            </label>
          </div>

          <div className="relative my-1">
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              placeholder=" "
              onChange={handleOnChange}
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="quantity"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Product Quantity
            </label>
          </div>
          <select
            name="category"
            id="category"
            className="my-1"
            onChange={handleOnChange}
            required
            value={form.categoryId}
          >
            <option value="" disabled>
              Please Select
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <hr />

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/4 flex bg-green-600 text-white justify-center items-center rounded hover:bg-green-700 ml-1"
          >
            <Plus />
          </button>
            <Uploadfile form={form} setForm={setForm}/>
        </form>
      </div>
    </div>
  );
};

export default FormEditProduct;
