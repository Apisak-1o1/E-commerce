import React, { useState, useEffect } from "react";
import { Plus, Trash2, Wrench } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/Product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import ProductTable from "./ProductTable";

const initailState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState(initailState);

  useEffect(() => {
    getCategory();
    getProduct( 100);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.categoryId === "" || !form.categoryId) {
      alert("Please select a category.");
      return
    }
    try {
      const res = await createProduct(token, form);
      toast.success(`Add Product ${res.data.name} Succesfully`);
      setForm(initailState)
      getProduct();
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  const handleDelete = async (id) => {
    if(window.confirm('Are you really wish to delete this product?')){
      try {
        const res = await deleteProduct(token, id);
        toast.success(`Delete Product ${res.data.name} Succesfully`);
        getProduct();
      } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error);
      }
    }
  };

  return (
    <div className="container flex justify-center min-h-screen bg-gray-100">
      <div className="m-5 w-full">
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

          <div className="flex">
          <div className="relative my-1 mr-1 w-1/2">
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

          <div className="relative my-1 ml-1 w-1/2">
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
          </div>
          <select
            name="categoryId"
            id="categoryId"
            className="my-1 w-full h-10"
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
            className="w-full h-16 flex bg-green-600 text-white justify-center items-center rounded hover:bg-green-700"
          >
            <Plus />
          </button>
            <Uploadfile form={form} setForm={setForm}/>
            <ProductTable products={products} handleDelete={handleDelete} />
        </form>

        {/* <hr /> */}
        {/* <ul className="list-none">
          {category.map((item, index) => (
            <li key={index} className="flex justify-between m-1">
              {item.name}
              <button
                type="submit"
                onClick={()=>handleRemove(item)}
                className="w-1/5 flex bg-red-400 text-white justify-center items-center rounded hover:bg-red-700 ml-1"
              >
                <Trash2  />
              </button>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default FormProduct;
