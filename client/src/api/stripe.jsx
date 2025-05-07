import axiosInstance from '../../axiosInstance'


export const payment = async (token) => 
    await axiosInstance.post('user/create-payment-intent', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})