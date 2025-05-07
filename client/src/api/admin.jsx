import axiosInstance from "../../axiosInstance";

export const getOrdersAdmin = async (token) => {
  return axiosInstance.get("admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const changeOrderStatus = async (token, orderId, orderStatus) => {
  return axiosInstance.put(
    "admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getListAllUsers = async (token) => {
  return axiosInstance.get("users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token,value) => {
  return axiosInstance.post("change-status",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token,value) => {
  return axiosInstance.post("change-role",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};