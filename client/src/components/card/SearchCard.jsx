/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);

  const [price, setPrice] = useState([1000, 30000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);
  const handlePrice = (value) => {
    console.log(value);
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
      console.log(
        "🚀 ~ handleCheck ~ actionSearchFilters({ category: inState });:",
        actionSearchFilters({ category: inState })
      );
    } else {
      getProduct();
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search</h1>
      <div className="relative my-1">
        <input
          type="text"
          name="search"
          onChange={(e) => setText(e.target.value)}
          placeholder="Search"
          className="w-full border border-gray-300 rounded px-3 pt-2 pb-2 focus:outline-none focus:border-blue-500"
        />
        <hr />

        <div>
          <h1>หมวดหมู่สินค้า</h1>
          <div>
            {categories.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input onChange={handleCheck} value={item.id} type="checkbox" />
                <label>{item.name}</label>
              </div>
            ))}
          </div>
        </div>

        <hr />
        <div>
          <h1>ค้นหาราคา</h1>
          <div>
            <div className="flex justify-between">
              <span>Min : {numberFormat(price[0])}</span>
              <span>Max : {numberFormat(price[1])}</span>
            </div>

            <Slider
              onChange={handlePrice}
              range
              min={0}
              max={100000}
              defaultValue={[1000, 30000]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
