import axios from "axios"


import { GET_USERS_SUCCESS, PATCH_USERS_ROLE_SUCCESS, USERS_FAILURE, USERS_REQUEST } from "./actionTypes"

export const getAllUsers=(dispatch)=>{
    dispatch({type:USERS_REQUEST})
   axios.get(`https://prickly-visor-ox.cyclic.app/users`).then((res)=>{
        dispatch({type:GET_USERS_SUCCESS,payload:res.data.data})
    })
    .catch((err)=>{
        dispatch({type:USERS_FAILURE})
    })
}

export const changeUserRole = (id,data)=>(dispatch)=>{
    dispatch({type:USERS_REQUEST})
    axios.patch(`https://prickly-visor-ox.cyclic.app/users/update/${id}`,data).then((res)=>{
        dispatch({type:PATCH_USERS_ROLE_SUCCESS})
        console.log("updated",res.data)
    })
    .catch((err)=>{
        dispatch(USERS_FAILURE)
    })
}