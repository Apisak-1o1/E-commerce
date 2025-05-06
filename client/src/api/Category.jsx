import axiosInstance from "../../axiosInstance"

export const createCategory =async(token, form)=> {
    return await axiosInstance.post('category',form,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const listCategory = async ()=> {
    return await axiosInstance.get('category')
}

export const removeCategory =async(token,id)=> {
    return await axiosInstance.delete('category/'+id,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}