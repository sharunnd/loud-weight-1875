import axios from "axios"
import { ADD_PETS_SUCCESS, DELETE_PETS_SUCCESS, GET_PETS_SUCCESS, PATCH_PETS_SUCCESS, PETS_FAILURE, PETS_REQUEST } from "./actionTypes"

export const getAllPets=(dispatch)=>{
    dispatch({type:PETS_REQUEST})
   axios.get(`https://petconnects-aml6.onrender.com/pets/`,).then((res)=>{
        dispatch({type:GET_PETS_SUCCESS,payload:{allPets:res.data.data,noOfPets:res.data.totalData}})
        console.log("dta...",res.data);
    })
    .catch((err)=>{
        dispatch({type:PETS_FAILURE})
    })
}

export const getAllPetsNumber=()=>(dispatch)=>{//getting the total number of pets
    dispatch({type:PETS_REQUEST})
   axios.get(`https://petconnects-aml6.onrender.com/pets`).then((res)=>{
        dispatch({type:GET_PETS_SUCCESS,payload:{allPets:res.data.data,noOfPets:res.data.totalData}})
        console.log("dta...",res.data);
    })
    .catch((err)=>{
        dispatch({type:PETS_FAILURE})
    })
}

export const updatePetDetails = (id,data)=>(dispatch)=>{
    console.log(id,data);
    dispatch({type:PETS_REQUEST})
    axios.patch(`https://petconnects-aml6.onrender.com/pets/update/${id}`,data,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res)=>{
        dispatch({type:PATCH_PETS_SUCCESS,payload:Math.random()})
        console.log(res.data.msg,"updated")
    })
    .catch((err)=>{
        console.log(err);
        dispatch(PETS_FAILURE)
    })
}

export const deletePetDetails = (id)=>(dispatch)=>{
    dispatch({type:PETS_REQUEST})
    
    let payload=[]
    axios.get(`https://petconnects-aml6.onrender.com/pets`).then((res)=>{
        payload = res.data.data.filter((el)=>el.id!==id)
    })
   
   return axios.delete(`https://petconnects-aml6.onrender.com/pets/delete/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res)=>{
        dispatch({type:DELETE_PETS_SUCCESS,payload})
        console.log(payload,"payload after deletion");
        console.log(res.data,"after deletion")
        
    })
    .catch((err)=>{
        dispatch(PETS_FAILURE)
    })
}

export const addPetDetails = (data)=>(dispatch)=>{
    dispatch({type:PETS_REQUEST})
    axios.post(`https://petconnects-aml6.onrender.com/pets/addPet`,data,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res)=>{
        dispatch({type:ADD_PETS_SUCCESS})
        console.log(res.data)
        
    })
    .catch((err)=>{
        console.log(err);
        dispatch(PETS_FAILURE)
    })
}