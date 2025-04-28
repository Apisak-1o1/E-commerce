import axiosInstance from "../../../axiosInstance";
import React, { useState } from "react";
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passMatch, setPassMatch] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      if (updatedForm.password === updatedForm.confirmPassword) {
        setPassMatch(true);
      } else {
        setPassMatch(false);
      }

      return updatedForm;
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await axiosInstance.post("register", form);
      // console.log("🚀 ~ handleSubmit ~ res:", res)
      toast.success('Register Success',res)
    } catch (error) {
      const errMsg = error.response?.data?.message
      toast.error(errMsg)
      // console.log("🚀 ~ handleSubmit ~ error:", error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
              placeholder=" "
              onChange={handleOnChange}
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Email
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
              placeholder=" "
              onChange={handleOnChange}
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Password
            </label>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
              placeholder=" "
              onChange={handleOnChange}
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Confirm Password
            </label>
          </div>

          {!passMatch && form.confirmPassword && (
            <div className="bg-red-100 text-red-600 border border-red-500 p-2 rounded mb-4">
              <p>Passwords do not match!</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={
              passMatch
                ? "w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                : "w-full bg-gray-500 text-red-100 py-2 rounded"
            }
            disabled={!passMatch}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
