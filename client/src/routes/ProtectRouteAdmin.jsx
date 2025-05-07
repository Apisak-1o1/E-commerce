/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react'
import useEcomStore from '../store/ecom-store'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteAdmin = ({element}) => {
    const [permission, setPermission]=useState(false)
    const user = useEcomStore((state)=>state.user)
    const token = useEcomStore((state)=>state.token)
    
    useEffect(()=>{
        if (user && token){
            currentAdmin(token)
            .then((res)=> setPermission(true))
            .catch((res)=> setPermission(false))
        }
    },[])


  return permission ?  element : <LoadingToRedirect/>


}

export default ProtectRouteAdmin