import React from "react";
import { Wrench, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ProductTable = ({ products, handleDelete }) => {
  return (
    <table className="table-auto w-full text-left border-separate border-spacing-0.5 ">
      <thead className="bg-gray-400 text-sm text-gray-900 ">
        <tr>
          <th scope="col" className="px-4 py-2">
            No
          </th>
          <th scope="col" className="px-4 py-2">
            Picture
          </th>
          <th scope="col" className="px-4 py-2">
            Title
          </th>
          <th scope="col" className="px-4 py-2">
            Description
          </th>
          <th scope="col" className="px-4 py-2">
            Price
          </th>
          <th scope="col" className="px-4 py-2">
            Quantity
          </th>
          <th scope="col" className="px-4 py-2">
            Sold
          </th>
          <th scope="col" className="px-4 py-2">
            Updated At
          </th>
          <th scope="col" className="px-4 py-2">
            Manage
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-300">
        {products.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-all">
            <td className="px-4 py-3 border-b border-gray-100">
              {index + 1}
            </td>
            <td className="px-4 py-3 border-b border-gray-200">
              {item.images.length > 0 ? (
                <img
                  className="w-16 h-16 rounded-md object-cover"
                  src={item.images[0].url}
                  alt={item.title}
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-md text-center flex justify-center items-center">
                  No Image
                </div>
              )}
            </td>
            <td className="px-4 py-3  border-b border-gray-200">
              {item.title}
            </td>
            <td className="px-4 py-3  border-b border-gray-200">
              {item.description}
            </td>
            <td className="px-4 py-3  border-b border-gray-200">
              ${item.price}
            </td>
            <td className="px-4 py-3  border-b border-gray-200">
              {item.quantity}
            </td>
            <td className="px-4 py-3  border-b border-gray-200">
              {item.sold}
            </td>
            <td className="px-4 py-3  border-b border-gray-200">
              {item.updatedAt}
            </td>
            <td className="px-4 py-6  border-gray-200 flex justify-evenly ">
              <Link to={"/admin/product/" + item.id}>
                <button
                  type="button"
                  className="flex justify-center items-center bg-yellow-500 text-white rounded hover:bg-yellow-600 p-2 transform hover:scale-105 transition-all"
                >
                  <Wrench />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                type="button"
                className="flex justify-center items-center bg-red-500 text-white rounded hover:bg-red-600 p-2 transform hover:scale-105 transition-all"
              >
                <Trash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
