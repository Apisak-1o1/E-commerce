import axiosInstance from "../../axiosInstance"

export const createProduct =async(token, form)=> {
    return await axiosInstance.post('product',form,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const listProduct = async (token, count = 10)=> {
    return await axiosInstance.get('product/'+count,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
