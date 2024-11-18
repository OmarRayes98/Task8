
import imageDefault from "@/assets/images/defaultProduct.png";
import ArrowBack from "@/components/common/ArrowBack/ArrowBack";
import ProductDetailsSkeleton from "@/components/skeletons/ProductDetailsSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import actGetProduct from "@/store/products/act/actGetProduct";
import {  resetDetailsProduct } from "@/store/products/productsSlice";
import { formatDate } from "@/utils/convertformat";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProdcutDetails = () => {

  const {product,loadingProduct} = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const {id} = useParams();


  useEffect(()=>{

    // if(allProducts?.length >0){
    //   dispatch(findProduct(id))
    // }else{

    if(id &&!product) // as long as > 1 mean contain data . if 1 : containe just {message}
    dispatch(actGetProduct(id));

    // }
    return ()=>{
      if(id ){
      dispatch(resetDetailsProduct())
      }
    }

  },[dispatch,id])

  return (
    <section className="px-[64px] pt-[24px] pb-[24px]">
      <ArrowBack path="/dashboard" />

      {
        loadingProduct==="pending"?
         <ProductDetailsSkeleton/>
        :
        (product && Object.keys(product)?.length > 1 ) ?
        <>
        <h2 className="mt-[76px] font-semibold text-4xl capitalize">
      {product?.name}
      </h2>

      <div className="mt-10 w-full max-w-[370px] max-h-[370px] mx-auto">
      <picture className="rounded-2xl h-full w-full bg-[#FEFEFE]" >
      <source  srcSet={(product?.image_url ? product?.image_url : "")} />
      <img src={imageDefault} alt="imageDefault" className=" object-cover object-center rounded-2xl  h-[370px] w-full bg-[#FEFEFE]"/>
      </picture>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-[25px] lg:gap-0 mt-[25px] ">
      <p className="font-semibold text-4xl capitalize inline-block">
      <span>
        Price:
      </span>
      <span className="text-[#8080808C] mx-4">
        {product?.price}$
      </span>
      </p>

      <p className="font-semibold text-4xl capitalize inline-block">
      <span className="">
        Added At:
      </span>
      <span className="text-[#8080808C] mx-4">
        {formatDate(product?.created_at)}
      </span>
      </p>
      </div>

      <p className="text-center font-semibold text-4xl capitalize  mt-[25px]">
      <span>
        Updated At:
      </span>
      <span className="text-[#8080808C] mx-4">
        {formatDate(product?.updated_at)}
      </span>
      </p>
        
        </>
        :
        (product?.message)&&
        <h1>
          {product?.message}
        </h1>
        
      }

      


    </section>
  )
}

export default ProdcutDetails
