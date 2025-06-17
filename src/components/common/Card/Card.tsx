import defaultImage from "@/assets/images/defaultProduct.png";

import { TProduct } from "@/types/shared.types";
import Modal from "../Modal/Modal";
import { useAppDispatch } from "@/store/hook";
import { useState } from "react";
import actDeleteProduct from "@/store/products/act/actDeleteProduct";
import actGetAllProducts from "@/store/products/act/actGetAllProducts";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts } from "@/store/products/productsSlice";


const Card = ({itemObject}:{itemObject:TProduct}) => {

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleModal = (isOpen:boolean) => setIsOpen(isOpen);

  const handleYesOrNoDelete = (shouldDelete:boolean)=>{

    if(shouldDelete){

    dispatch(actDeleteProduct(itemObject?._id))
    .unwrap()
    .then(() => {
        setIsOpen(false)
        
        dispatch(actGetAllProducts()).unwrap().then(()=>{
          dispatch(searchProducts(""))
        });

    });
    } 
    else{
    //just close
    setIsOpen(false)
    return;
    }


  }

  return (
    <div className="w-full  h-[208px] rounded-2xl custom-shadow group">
    <div className="relative overflow-hidden h-full w-full ">

      <picture className="h-[208px] mx-auto w-[208px] rounded-2xl">
      <source srcSet={itemObject?.image ? import.meta.env.VITE_API_Domain+itemObject?.image : ""}/>
      <img  loading="lazy" className="object-cover object-center h-[208px] mx-auto w-[208px] rounded-2xl" src={defaultImage} alt={itemObject?.name} />
      </picture>

      <div className="absolute cursor-pointer px-[15px] rounded-2xl h-full w-full bg-[#F2EAE1B2] flex flex-col items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Link to={`product-details/${itemObject?._id}`} className="text-[22px] font-medium leading-[35px]">
        {itemObject?.name}
        </Link>
        <div className="flex justify-between gap-2 mt-[30px]">
        <button onClick={()=>{navigate(`edit-product/${itemObject?._id}`)}} className="bg-primary rounded hover:bg-primary/75 text-white w-[81px] h-[34px]">Edit</button>
        <button onClick={()=>handleModal(true)} className="bg-[#FE0000] hover:bg-[#fe0000be] rounded text-white w-[81px] h-[34px]">Delete</button>

        </div>
      </div>
      
    </div>

    <Modal isOpen={isOpen} handleYesOrNoDelete={handleYesOrNoDelete}/>

    </div>
  )
}

export default Card
