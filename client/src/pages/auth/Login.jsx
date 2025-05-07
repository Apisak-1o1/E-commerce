
import React, { useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
const actionLogin = useEcomStore((state)=>state.actionLogin)

const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      return updatedForm;
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form)
      const userRole = res.data.payload.role
      rolreRedirect(userRole)
      toast.success('Login Success',res)
    } catch (error) {
      const errMsg = error.response?.data?.message
      toast.error(errMsg)
    }
  };

  const rolreRedirect = (role)=>{
    if(role==='admin'){
      navigate('/admin')
    } else {
      navigate('/user')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>

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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                
            
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
