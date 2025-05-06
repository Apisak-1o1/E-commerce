import axiosInstance from "../../axiosInstance"

export const createProduct =async(token, form)=> {
    return await axiosInstance.post('product',form,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const listProduct = async (count = 10)=> {
    return await axiosInstance.get('products/'+count)
}
export const readProduct = async (token, id)=> {
    return await axiosInstance.get('product/'+id,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const deleteProduct = async (token, id)=> {
    return await axiosInstance.delete('product/'+id,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const updateProduct = async (token, id, form)=> {
    return await axiosInstance.put('product/'+id,form,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const uploadFiles = async (token, form)=> {
    return await axiosInstance.post('images',{
        image:form
    },{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const removeFiles = async (token, public_id)=> {
    return await axiosInstance.post('removeimages',{
        public_id
    },{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}





export const searchFilters = async (arg)=> {
    return await axiosInstance.post('search/filters',arg)
}