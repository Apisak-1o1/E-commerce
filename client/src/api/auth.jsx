import axiosInstance from "../../axiosInstance"

export const currentUser =async(token)=> await axiosInstance.post('current-user',{},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})


export const currentAdmin =async(token)=> await axiosInstance.post('current-admin',{},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
